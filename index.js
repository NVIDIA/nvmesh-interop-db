const { Op, Sequelize } = require('sequelize');
const { ArchType } = require('./Models/ArchType.js');
const { DistributionType } = require('./Models/DistributionType.js');
const { Ofed } = require('./Models/Ofed.js');
const { OperatingSystem } = require('./Models/OperatingSystem.js');
const { Kernel } = require('./Models/Kernel.js');
const { Setup } = require('./Models/Setup.js');
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

exports.getAllSetups = async(queryObj, cb) => {
	const setups = await dbAPI.getAllSetups(queryObj);

	cb(setups);
};

exports.createSetup = async(setup, cb) => {
	const result = await dbAPI.createSetup(setup);

	cb(result);
};

exports.deleteSetups = async(setups, cb) => {
	const results = await dbAPI.deleteSetups({ ID: { [Op.in]: setups.map((s) => s.ID) } });

	cb(results);
};

exports.deleteReleases = async(releases, cb) => {
	const results = await dbAPI.deleteReleases({ ID: { [Op.in]: releases.map((r) => r.ID) } });

	cb(results);
};

exports.updateSetup = async(setup, cb) => {
	const results = await dbAPI.updateSetup(setup);

	cb(results);
};

exports.getAllReleases = async(queryObj, cb) => {
	const results = await dbAPI.getAllComponentVersions(queryObj);

	cb(results);
};

exports.createRelease = async(release, cb) => {
	const result = await dbAPI.createRelease(release);

	cb(result);
};

exports.getAllComponentSetups = async(cb) => {
	const results = await dbAPI.getAllComponentSetups();

	cb(results);
};

exports.updateRelease = async(release, cb) => {
	const results = await dbAPI.updateRelease(release);

	cb(results);
};

exports.countSetups = async(cb) => {
	const results = await dbAPI.countEntities(Setup);

	cb(results);
};

exports.countReleases = async(cb) => {
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

		let models = [Kernel, ArchType, Ofed, DistributionType, OperatingSystem, Setup, ComponentType, Component, ComponentVersion, ComponentCompatibility, ComponentRequirement];

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

exports.getPossibleUpgrades = async(sourceVersion, cb) => {
	const results = await dbAPI.getPossibleUpgrades(sourceVersion);

	cb(results);
};
