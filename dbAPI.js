const { Sequelize } = require('sequelize');
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

exports.connect = async(dbPath) => {
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
};

exports.getComponentByID = async(componentID) => {
	return await Component(sequelize).findOne({ where: { name: componentID } });
};

exports.getSupportedKafkaTopics = async(component, version) => {
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
};

exports.getAllArchTypes = async() => {
	const archTypes = await ArchType(sequelize).findAll({});

	return archTypes.map((a) => a.dataValues);
};

exports.getAllOperatingSystems = async() => {
	const operatingSystems = await OperatingSystem(sequelize).findAll({
		include: [{
			model: DistributionType(sequelize), as: tableAssociations.DISTRIBUTION_TYPE
		}]
	});

	return operatingSystems.map((a) => { return { ID: a.ID, distributionType: a.distributionType.name, version: a.version } });
};

exports.getAllKernels = async() => {
	const kernels = await Kernel(sequelize).findAll({});

	return kernels.map((kernel) => kernel.dataValues);
};

exports.getAllOfeds = async() => {
	const ofeds = await Ofed(sequelize).findAll({});

	return ofeds.map((ofed) => ofed.dataValues);
};

exports.getComponentVersion = async(component, version) => {
	return await ComponentVersion(sequelize).findOne({
		where: { version: version },
		include: [{ model: Component(sequelize), where: { 'name': component }, as: tableAssociations.COMPONENT }]
	});
};

exports.getAllSetups = async() => {
	const setups = await Setup(sequelize).findAll({
		include: [
			{ model: ArchType(sequelize), as: tableAssociations.ARCH_TYPE },
			{ model: OperatingSystem(sequelize), as: tableAssociations.OPERATING_SYSTEM, include: [
				{ model: DistributionType(sequelize), as: tableAssociations.DISTRIBUTION_TYPE }
			] },
			{ model: Kernel(sequelize), as: tableAssociations.KERNEL },
			{ model: Ofed(sequelize), as: tableAssociations.OFED }
		]
	});

	return setups;
};

exports.createSetup = async(setup) => {
	return await Setup(sequelize).create(setup);
};

exports.deleteSetup = async(whereObj) => {
	return await Setup(sequelize).destroy({ where: whereObj });
};