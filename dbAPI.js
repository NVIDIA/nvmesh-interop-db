const { Op, Sequelize } = require('sequelize');
const { tableAssociations, componentTypes, components } = require('./consts.js');
const {
	Platform,
	DistributionType,
	ComponentVersion,
	ComponentType,
	ComponentCompatibility,
	Component,
	ComponentVersionPlatform,
	Kernel,
	Ofed,
	OperatingSystem,
	ArchType,
	Upgrade,
	UpgradeType,
	Release,
	UpgradeStep,
	Artifact
} = require('./Models/Inititializer.js');

let sequelize;

let scope = {
	connect: async(dbPath) => {
		if (!sequelize) {
			sequelize = new Sequelize({
				dialect: 'sqlite',
				storage: dbPath
			});
		}

		try {
			await sequelize.authenticate();
			return sequelize;
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
	},
	getComponentByID: async(componentID) => {
		return await Component(sequelize).findOne({ where: { name: componentID } });
	},
	getCompatibilities: async(component, type, version) => {
		const componentCompatibility = ComponentCompatibility(sequelize);

		const compatibilities = await componentCompatibility.findAll({
			include: [{
				model: ComponentVersion(sequelize),
				as: tableAssociations.SOURCE_VERSION,
				where: { version: version },
				required: true,
				include: {
					model: Component(sequelize),
					as: tableAssociations.COMPONENT,
					where: { name: component }
				}
			},
			{
				model: ComponentVersion(sequelize),
				as: tableAssociations.DESTINATION_VERSION,
				required: true,
				include: {
					model: Component(sequelize),
					as: tableAssociations.COMPONENT,
					required: true,
					include: {
						model: ComponentType(sequelize),
						where: { name: type },
						as: tableAssociations.COMPONENT_TYPE
					}
				}
			}]
		});

		return compatibilities.reduce((acc, curr) => {
			(acc[curr.destinationVersion.component.name] ??= []).push(curr.destinationVersion.version);

			return acc;
		}, {});
	},
	//TODO:Get requirements by component version
	getAllArchTypes: async() => {
		const archTypes = await ArchType(sequelize).findAll({});

		return archTypes.map((a) => a.dataValues);
	},
	getAllOperatingSystems: async(queryObj) => {
		let filtSortObj = parseQueryObj(queryObj);

		const operatingSystems = await OperatingSystem(sequelize).findAll({
			include: [{
				model: DistributionType(sequelize), as: tableAssociations.DISTRIBUTION_TYPE
			}],
			...filtSortObj
		});

		return operatingSystems.map((a) => { return { ID: a.ID, distributionType: a.distributionType.name, version: a.version } });
	},
	getAllArtifacts: async(queryObj) => {
		let filtSortObj = parseQueryObj(queryObj);

		const artifacts = await Artifact(sequelize).findAll({
			include: [{	model: Platform(sequelize), as: 'platforms'	}],
			...filtSortObj
		});

		return artifacts.map((a) => a.dataValues);
	},
	getAllComponentTypes: async() => {
		const componentTypes = await ComponentType(sequelize).findAll({});

		return  componentTypes.map((componentType) => componentType.dataValues);
	},
	getAllComponents: async(queryObj, eagerLoading) => {
		const filtSortObj = parseQueryObj(queryObj);

		const findObj = {
			...filtSortObj
		};

		if (eagerLoading)
			findObj.include = [{
				model: ComponentType(sequelize), as: tableAssociations.COMPONENT_TYPE
			}];

		const components = await Component(sequelize).findAll(findObj);

		return components;
	},
	getComponentsByTypeID: async(componentTypeID) => {
		let components = await Component(sequelize).findAll({
			include: [
				{ model: ComponentType(sequelize), as: tableAssociations.COMPONENT_TYPE, where: { ID: componentTypeID } }
			]
		});

		return components.map((component) => component.dataValues);
	},
	getComponentVersion: async(component, version) => {
		return await ComponentVersion(sequelize).findOne({
			where: { version: version },
			include: [{ model: Component(sequelize), where: { 'name': component }, as: tableAssociations.COMPONENT }]
		});
	},
	getAllPlatforms: async(queryObj) => {
		let filtSortObj = parseQueryObj(queryObj);

		let findObj = {
			include: [
				{ model: ArchType(sequelize), as: tableAssociations.ARCH_TYPE },
				{ model: OperatingSystem(sequelize), as: tableAssociations.OPERATING_SYSTEM, include: [
					{ model: DistributionType(sequelize), as: tableAssociations.DISTRIBUTION_TYPE }
				] },
				{ model: Kernel(sequelize), as: tableAssociations.KERNEL },
				{ model: Ofed(sequelize), as: tableAssociations.OFED }
			],
			...filtSortObj
		}

		const platforms = await Platform(sequelize).findAll(findObj);

		return platforms;
	},
	createPlatform: async(platform) => {
		return await Platform(sequelize).create(platform);
	},
	deletePlatforms: async(whereObj) => {
		return await Platform(sequelize).destroy({ where: whereObj });
	},
	updatePlatform: async(platform) => {
		return await Platform(sequelize).update(platform, { where: { ID: platform.ID } });
	},
	getAllComponentVersions: async(queryObj) => {
		let filtSortObj = parseQueryObj(queryObj);
		let limit = filtSortObj.limit;

		delete filtSortObj.limit;

		let findObj = {
			include: [{
				model: Component(sequelize), as: tableAssociations.COMPONENT , include: [
					{ model: ComponentType(sequelize), as: tableAssociations.COMPONENT_TYPE }
				]
			}, {
				model: Platform(sequelize),
				as: 'platforms'
			}, {
				model: Component(sequelize),
				as: 'requirements'
			}, {
				model: ComponentVersion(sequelize),
				as: 'compatibilities'
			}],
			...filtSortObj
		}

		let componentVersions = await ComponentVersion(sequelize).findAll(findObj);

		if (limit)
			componentVersions = componentVersions.slice(0, limit);

		return componentVersions;
	},
	getAllComponentPlatforms: async() => {
		let findObj = {
			include: [{
				model: ComponentVersion(sequelize),
				as: tableAssociations.COMPONENT_VERSION,
				required: true,
			}]
		};

		return await ComponentVersionPlatform(sequelize).findAll(findObj);
	},
	updateComponentVersion: async(cv) => {
		const transaction = await sequelize.transaction();

		try {
			const componentVersion = await ComponentVersion(sequelize).findByPk(cv.ID, {
				model: Platform(sequelize),
				as: 'platforms'
			});

			if (!componentVersion) {
				throw new Error('ComponentVersion not found');
			}

			await componentVersion.update(cv, { where: { ID: cv.ID }, transaction });

			if (cv.platforms)
				await componentVersion.setPlatforms(cv.platforms.map((p) => p.ID), { transaction });

			if (cv.requirements)
				await componentVersion.setRequirements(cv.requirements.map((r) => r.ID), { transaction });

			if (cv.compatibilities)
				await componentVersion.setCompatibilities(cv.compatibilities.map((c) => c.ID), { transaction });

			await transaction.commit();

			return { success: true };
		} catch (error) {
			await transaction.rollback();

			return { success: false, error };
		}
	},
	createComponentVersion: async(cv) => {
		const transaction = await sequelize.transaction();

		try {
			const componentVersion = await ComponentVersion(sequelize).create(cv, { transaction });

			if (cv.platforms)
				await componentVersion.setPlatforms(cv.platforms.map((p) => p.ID), { transaction });

			if (cv.requirements)
				await componentVersion.setRequirements(cv.requirements.map((r) => r.ID), { transaction });

			if (cv.compatibilities)
				await componentVersion.setCompatibilities(cv.compatibilities.map((c) => c.ID), { transaction });

			await transaction.commit();

			if (componentVersion.data?.error)
				throw (componentVersion.data.error);

			return componentVersion;
		} catch (error) {
			if (transaction.finished !== 'commit')
				await transaction.rollback();

			throw (error);
		}
	},
	deleteComponentVersions: async(whereObj) => {
		return await ComponentVersion(sequelize).destroy({ where: whereObj });
	},
	countEntities: async(entity) => {
		const count = await entity(sequelize).count();

		return count;
	},
	createEntity: async(entity, entityObj) => {
		return await entity(sequelize).create(entityObj);
	},
	createOperatingSystem: async(operatingSystem) => {
		const operatingSystems = await OperatingSystem(sequelize).create(operatingSystem, { include: [{ model: DistributionType(sequelize), as: tableAssociations.DISTRIBUTION_TYPE }] });

		return operatingSystems.map((os) => os.dataValues);
	},
	deleteEntitiesByIDs: async(entity, ids) => {
		return await entity(sequelize).destroy({ where: { ID: { [Op.in]: ids } } });
	},
	updateEntity: async(entity, entityObj) => {
		return await entity(sequelize).update(entityObj, { where: { ID: entityObj.ID } });
	},
	getAllEntities: async(entity, queryObj) => {
		let filtSortObj = parseQueryObj(queryObj);

		const entities = await entity(sequelize).findAll(filtSortObj);

		return entities.map((entity) => entity.dataValues);
	},
	getPossibleUpgrades: async(sourceVersion) => {
		const results = await Upgrade(sequelize).findAll({
			include: [
				{ model: UpgradeType(sequelize), as: tableAssociations.UPGRADE_TYPE },
				{ model: Release(sequelize), as: tableAssociations.RELEASE },
				{ model: ComponentVersion(sequelize), as: tableAssociations.COMPONENT_VERSION, where: { version: sourceVersion } }
			]
		});

		return results.map((r) => r.dataValues);
	},
	getUpgradeScenario: async(component, sourceVersion, destinantionRelease) => {
		const results = await Upgrade(sequelize).findAll({
			include: [
				{ model: Release(sequelize), as: tableAssociations.RELEASE, where: { version: destinantionRelease } },
				{ model: ComponentVersion(sequelize), as: tableAssociations.COMPONENT_VERSION, where: { version: sourceVersion }, include: [
					{ model: Component(sequelize), as: tableAssociations.COMPONENT, where: { name: component } }
				] },
				{ model: UpgradeStep(sequelize), as: 'steps' }
			]
		});

		return results;
	},
	getReleaseArtificatsForMachine: async(release, osType, osVersion, kernel, ofed, architecture) => {
		const results = await Release(sequelize).findAll({
			include: [{
					model: Artifact(sequelize), as: 'artifacts',
					include: [
						{ model: Platform(sequelize), as: 'platforms', required: true, include: [
							{ model: OperatingSystem(sequelize), as: tableAssociations.OPERATING_SYSTEM, where: { version: osVersion }, include: [
								{ model: DistributionType(sequelize), as: tableAssociations.DISTRIBUTION_TYPE, where: { name: osType } }
							]},
							{ model: Kernel(sequelize), as: tableAssociations.KERNEL, where: { version: kernel } },
							{ model: Ofed(sequelize), as: tableAssociations.OFED, where: { version: ofed } },
							{ model: ArchType(sequelize), as: tableAssociations.ARCH_TYPE, where: { name: architecture } }
						] },
					]
				}
			],
			where: { version: release }
		});

		return results;
	},
	createArtifact: async(artifactToCreate) => {
		const transaction = await sequelize.transaction();

		try {
			const artifact = await Artifact(sequelize).create(artifactToCreate, { transaction });

			if (artifactToCreate.platforms)
				await artifact.setPlatforms(artifactToCreate.platforms.map((p) => p.ID), { transaction });

			await transaction.commit();

			return artifact;
		} catch (error) {
			if (transaction.finished !== 'commit')
				await transaction.rollback();

			throw (error);
		}
	},
	updateArtifact: async(artifactToUpdate) => {
		const transaction = await sequelize.transaction();

		try {
			const artifact = await Artifact(sequelize).findByPk(artifactToUpdate.ID, {
				model: Platform(sequelize),
				as: 'platforms'
			});

			if (!artifact) {
				throw new Error('Artifact not found');
			}

			await artifact.update(artifactToUpdate, { where: { ID: artifactToUpdate.ID }, transaction });

			if (artifactToUpdate.platforms)
				await artifact.setPlatforms(artifactToUpdate.platforms.map((p) => p.ID), { transaction });

			await transaction.commit();

			return artifact;
		} catch (error) {
			if (transaction.finished !== 'commit')
				await transaction.rollback();

			throw (error);
		}
	},
	deleteArtifacts: async(artifacts) => {
		for (const a of artifacts) {
			const artifact = await Artifact(sequelize).findByPk(a.ID);
			await artifact.setPlatforms([]);
			await artifact.destroy();
		}
	},

};

function parseQueryObj({sort, filter, skip, limit}) {
	const results = {};

	if (!isEmpty(sort))
		results['order'] = convertSortToOrder(sort);

	if (!isEmpty(filter))
		results['where'] = convertFilterToWhere(filter);

	if (skip)
		results['offset'] = skip;

	if (limit)
		results['limit'] = limit;

	return results;
}

function isEmpty(obj) {
	for (const prop in obj) {
		if (Object.hasOwn(obj, prop)) {
			return false;
		}
	}

	return true;
  }

function isObject(variable) {
	return typeof variable === 'object' && !Array.isArray(variable) && variable !== null;
}

function convertFilterToWhere(filter) {
	const where = {};
	let value;

	for (let key in filter) {
		value = isObject(filter[key]) && '$regex' in filter[key]
			? { [Op.like]: `%${filter[key]['$regex']}%` }
			: filter[key]

		where[key.includes('.') ? `$${key}$` : key] = value;
	}

	return where;
}

function convertSortToOrder(sort) {
	return Object.entries(sort).map(([k, v]) =>
		[...k.split('.'), v === 1 ? 'ASC' : 'DESC']
	);
}

function warpWithTryCatch(fn) {
	let response = {};

	return async (...args) => {
		try {
			response.data = await fn(...args);
			response.error = null;
		} catch (error) {
			response.error = error;
		} finally {
			response.success = !response.error;
			return response;
		}
	};
}

function applyMiddleware(obj, middleware) {
	return Object.fromEntries(
		Object.entries(obj).map(([name, fn]) => [
			name,
			typeof fn === "function" ? middleware(fn) : fn,
		])
	);
}

module.exports = applyMiddleware(scope, warpWithTryCatch);
