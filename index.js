const { Op, Sequelize } = require('sequelize');
const { ArchType } = require('./Models/ArchType.js');
const { DistributionType } = require('./Models/DistributionType.js');
const { Ofed } = require('./Models/Ofed.js');
const { OperatingSystem } = require('./Models/OperatingSystem.js');
const { Kernel } = require('./Models/Kernel.js');
const { Platform } = require('./Models/Platform.js');
const { ComponentType } = require('./Models/ComponentType.js');
const { Component } = require('./Models/Component.js');
const { ComponentVersion } = require('./Models/ComponentVersion.js');
const { ComponentCompatibility } = require('./Models/ComponentCompatibility.js');
const { ComponentRequirement } = require('./Models/ComponentRequirement.js');
const dbAPI = require('./dbAPI.js');
const { components, tableAssociations, componentTypes } = require('./consts.js');

let sequelize;

function printModels(models) {
	for (let model of models)
		console.log(model.dataValues);
}

function includeAllAssociations(model) {
	return { include: Object.values(model.associations).map(a => a.as) };
}

async function printModel(modelFn) {
	let model = modelFn(sequelize);

	let entities = await model.findAll(Object.keys(model.associations).length ? includeAllAssociations(model) : {});
	console.log(`Current ${model.name}s:`);
	printModels(entities);
}

exports.connect = async(path, cb) => {
	sequelize = await dbAPI.connect(path);

	if (cb)
		cb();
};

exports.getSupportedKafkaTopics = async (component, version, cb) => {
	const topics = await dbAPI.getCompatibilities(component, componentTypes.KAFKA_TOPIC, version);

	cb(topics);
};

exports.getAllArchTypes = async(cb) => {
	const entities = await dbAPI.getAllArchTypes(ArchType);

	cb(entities);
};

exports.getAllOperatingSystems = async(cb) => {
	const entities = await dbAPI.getAllOperatingSystems();

	cb(entities);
};

exports.getAllKernels = async(cb) => {
	const entities = await dbAPI.getAllKernels();

	cb(entities);
};

exports.getAllOfeds = async(cb) => {
	const entities = await dbAPI.getAllOfeds();

	cb(entities);
};

exports.getAllComponentTypes = async(cb) => {
	const entities = await dbAPI.getAllComponentTypes();

	cb(entities);
};

exports.getAllComponents = async(queryObj, eagerLoading=false, cb) => {
	const results = await dbAPI.getAllComponents(queryObj, eagerLoading);

	cb(results);
};

exports.getComponentsByTypeID = async(componentTypeID, cb) => {
	const entities = await dbAPI.getComponentsByTypeID(componentTypeID);

	cb(entities);
}

exports.getAllPlatforms = async(queryObj, cb) => {
	const platforms = await dbAPI.getAllPlatforms(queryObj);

	cb(platforms);
};

exports.createPlatform = async(platform, cb) => {
	const result = await dbAPI.createPlatform(platform);

	cb(result);
};

exports.deletePlatforms = async(platforms, cb) => {
	const results = await dbAPI.deletePlatforms({ ID: { [Op.in]: platforms.map((p) => p.ID) } });

	cb(results);
};

exports.deleteComponentVersions = async(componentVersions, cb) => {
	const results = await dbAPI.deleteComponentVersions({ ID: { [Op.in]: componentVersions.map((r) => r.ID) } });

	cb(results);
};

exports.updatePlatform = async(platform, cb) => {
	const results = await dbAPI.updatePlatform(platform);

	cb(results);
};

exports.getAllComponentVersions = async(queryObj, cb) => {
	const results = await dbAPI.getAllComponentVersions(queryObj);

	cb(results);
};

exports.createComponentVersion = async(componentVersion, cb) => {
	const result = await dbAPI.createComponentVersion(componentVersion);

	cb(result);
};

exports.getAllComponentPlatforms = async(cb) => {
	const results = await dbAPI.getAllComponentPlatforms();

	cb(results);
};

exports.updateComponentVersion = async(componentVersion, cb) => {
	const results = await dbAPI.updateComponentVersion(componentVersion);

	cb(results);
};

exports.countPlatforms = async(cb) => {
	const results = await dbAPI.countEntities(Platform);

	cb(results);
};

exports.countComponentVersions = async(cb) => {
	const results = await dbAPI.countEntities(ComponentVersion);

	cb(results);
};

exports.countComponents = async(cb) => {
	const results = await dbAPI.countEntities(Component);

	cb(results);
};

//DEBUG
exports.logAllEntities = async () => {
	try {
		await printModel(Kernel);

		let models = [Kernel, ArchType, Ofed, DistributionType, OperatingSystem, Platform, ComponentType, Component, ComponentVersion, ComponentCompatibility, ComponentRequirement];

		await Promise.all(models.map(m => printModel(m)));
	} catch (error) {
		console.log(error);
	} finally {
		console.log('Done!');
	}
};

exports.printMsg = (msg) => {
	console.log(`printMsg invoked with ${msg}`);
};

exports.getSupportedMongoCollections = async(version, cb) => {
	const collections = await dbAPI.getCompatibilities(components.MANAGEMENT, componentTypes.MONGO_COLLECTION, version);

	cb(collections);
};

exports.getCompatibilities = async(component, type, version, cb) => {
	const results = await dbAPI.getCompatibilities(component, type, version);

	cb(results);
};

exports.getPossibleUpgrades = async(sourceVersion, cb) => {
	const results = await dbAPI.getPossibleUpgrades(sourceVersion);

	cb(results);
};

exports.getUpgradeScenario = async(component, sourceVersion, destinantionRelease, cb) => {
	const results = await dbAPI.getUpgradeScenario(component, sourceVersion, destinantionRelease);

	cb(results.data.length ? results.data[0] : results);
};

exports.getReleaseArtificatsForMachine = async(release, osType, osVersion, kernel, ofed, architecture, cb) => {
	const results = await dbAPI.getReleaseArtificatsForMachine(release, osType, osVersion, kernel, ofed, architecture);

	cb(results.data.length ? results.data[0] : results);
};
