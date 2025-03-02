const { Op, Sequelize } = require('sequelize');
const { ArchType } = require('./Models/ArchType.js');
const { Component } = require('./Models/Component.js');
const { ComponentType } = require('./Models/ComponentType.js');
const { ComponentVersion } = require('./Models/ComponentVersion.js');
const { ComponentCompatibility } = require('./Models/ComponentCompatibility.js');
const { components, tableAssociations, componentTypes } = require('./consts.js');
const { OperatingSystem } = require('./Models/OperatingSystem.js');
const { Ofed } = require('./Models/Ofed.js');
const { Kernel } = require('./Models/Kernel.js');
const { DistributionType } = require('./Models/DistributionType.js');
const { Setup } = require('./Models/Setup.js');

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
	getSupportedKafkaTopics: async(component, version) => {
		const compatibilities = await ComponentCompatibility(sequelize).findAll({
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
						where: { name: componentTypes.KAFKA_TOPIC },
						as: tableAssociations.COMPONENT_TYPE
					}
				}
			}]
		});

		return compatibilities.map((c) => c.destinationVersion.component.name);
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
	getAllComponents: async() => {
		const components = await Component(sequelize).findAll({});

		return components.map((component) => component.dataValues);
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

		let findObj = {
			include: [
				{
					model: Component(sequelize), as: tableAssociations.COMPONENT , include: [
						{ model: ComponentType(sequelize), as: tableAssociations.COMPONENT_TYPE }
					]
				}
			],
			...filtSortObj
		}

		const componentVersions = await ComponentVersion(sequelize).findAll(findObj);

		return componentVersions;
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