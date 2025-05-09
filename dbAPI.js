const { Op, Sequelize } = require('sequelize');
const { tableAssociations, componentTypes, components } = require('./consts.js');
const {
	Setup,
	DistributionType,
	ComponentVersion,
	ComponentType,
	ComponentCompatibility,
	Component,
	ComponentVersionSetup,
	Kernel,
	Ofed,
	OperatingSystem,
	ArchType,
	Upgrade,
	UpgradeType,
	Release
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
	getAllArchTypes: async() => {
		const archTypes = await ArchType(sequelize).findAll({});

		return archTypes.map((a) => a.dataValues);
	},
	getAllOperatingSystems: async() => {
		const operatingSystems = await OperatingSystem(sequelize).findAll({
			include: [{
				model: DistributionType(sequelize), as: tableAssociations.DISTRIBUTION_TYPE
			}]
		});

		return operatingSystems.map((a) => { return { ID: a.ID, distributionType: a.distributionType.name, version: a.version } });
	},
	getAllKernels: async() => {
		const kernels = await Kernel(sequelize).findAll({});

		return kernels.map((kernel) => kernel.dataValues);
	},
	getAllOfeds: async() => {
		const ofeds = await Ofed(sequelize).findAll({});

		return ofeds.map((ofed) => ofed.dataValues);
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
	getAllSetups: async(queryObj) => {
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

		const setups = await Setup(sequelize).findAll(findObj);

		return setups;
	},
	createSetup: async(setup) => {
		return await Setup(sequelize).create(setup);
	},
	deleteSetups: async(whereObj) => {
		return await Setup(sequelize).destroy({ where: whereObj });
	},
	updateSetup: async(setup) => {
		return await Setup(sequelize).update(setup, { where: { ID: setup.ID } });
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
				model: Setup(sequelize),
				as: 'setups'
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
	getAllComponentSetups: async() => {
		let findObj = {
			include: [{
				model: ComponentVersion(sequelize),
				as: tableAssociations.COMPONENT_VERSION,
				required: true,
			}]
		};

		return await ComponentVersionSetup(sequelize).findAll(findObj);
	},
	updateRelease: async(release) => {
		const transaction = await sequelize.transaction();

		try {
			const componentVersion = await ComponentVersion(sequelize).findByPk(release.ID, {
				model: Setup(sequelize),
				as: 'setups'
			});

			if (!componentVersion) {
				throw new Error('ComponentVersion not found');
			}

			await componentVersion.update(release, { where: { ID: release.ID }, transaction });

			if (release.setups)
				await componentVersion.setSetups(release.setups.map((s) => s.ID), { transaction });

			if (release.requirements)
				await componentVersion.setRequirements(release.requirements.map((r) => r.ID), { transaction });

			if (release.compatibilities)
				await componentVersion.setCompatibilities(release.compatibilities.map((c) => c.ID), { transaction });

			await transaction.commit();

			return { success: true };
		} catch (error) {
			await transaction.rollback();

			return { success: false, error };
		}
	},
	createRelease: async(release) => {
		const transaction = await sequelize.transaction();

		try {
			const componentVersion = await ComponentVersion(sequelize).create(release, { transaction });

			if (release.setups)
				await componentVersion.setSetups(release.setups.map((s) => s.ID), { transaction });

			if (release.requirements)
				await componentVersion.setRequirements(release.requirements.map((r) => r.ID), { transaction });

			if (release.compatibilities)
				await componentVersion.setCompatibilities(release.compatibilities.map((c) => c.ID), { transaction });

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
	deleteReleases: async(whereObj) => {
		return await ComponentVersion(sequelize).destroy({ where: whereObj });
	},
	countEntities: async(entity) => {
		const count = await entity(sequelize).count();

		return count;
	},
	getPossibleUpgrades: async(sourceVersion) => {
		const results = await Upgrade(sequelize).findAll({
			include: [
				{ model: UpgradeType(sequelize), as: tableAssociations.UPGRADE_TYPE },
				{ model: Release(sequelize), as: tableAssociations.RELEASE },
				{ model: ComponentVersion(sequelize), as: tableAssociations.COMPONENT_VERSION, where: { version: sourceVersion } }
			]
		});

		return results;
	}
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
