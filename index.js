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
const { Artifact } = require('./Models/Artifact.js');
const { Release } = require('./Models/Release.js');
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

exports.connect = async(path, cb = () => {}) => {
	const response = await dbAPI.connect(path);
	if (!response.success)
		return cb(response.error);

	sequelize = response.data;
	cb();
};

exports.reconnect = async(path, cb = () => {}) => {
	const response = await dbAPI.reconnect(path);
	if (!response.success)
		return cb(response.error);

	sequelize = response.data;
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

exports.getAllOperatingSystems = async(queryObj, cb) => {
	const entities = await dbAPI.getAllOperatingSystems(queryObj);

	cb(entities);
};

exports.getAllKernels = async(queryObj, cb) => {
	const entities = await dbAPI.getAllEntities(Kernel, queryObj);

	cb(entities);
};

exports.getAllOfeds = async(queryObj, cb) => {
	const entities = await dbAPI.getAllEntities(Ofed, queryObj);

	cb(entities);
};

exports.getAllDistributionTypes = async(queryObj, cb) => {
	const entities = await dbAPI.getAllEntities(DistributionType, queryObj);

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

exports.countPlatforms = async(queryObj, cb) => {
	const results = await dbAPI.countPlatforms(queryObj);

	cb(results);
};

exports.countComponentVersions = async(queryObj, cb) => {
	const results = await dbAPI.countComponentVersions(queryObj);

	cb(results);
};

exports.countComponents = async(queryObj, cb) => {
	const results = await dbAPI.countComponents(queryObj);

	cb(results);
};

exports.countOfeds = async(queryObj, cb) => {
	const results = await dbAPI.countEntities(Ofed, queryObj);

	cb(results);
};

exports.createOfed = async(ofed, cb) => {
	const result = await dbAPI.createEntity(Ofed, ofed);

	cb(result);
};

exports.deleteOfeds = async(ofeds, cb) => {
	const results = await dbAPI.deleteEntitiesByIDs(Ofed, ofeds.map((o) => o.ID));

	cb(results);
};

exports.updateOfed = async(ofed, cb) => {
	const results = await dbAPI.updateEntity(Ofed, ofed);

	cb(results);
};

exports.countKernels = async(queryObj, cb) => {
	const results = await dbAPI.countEntities(Kernel, queryObj);

	cb(results);
};

exports.createKernel = async(kernel, cb) => {
	const result = await dbAPI.createEntity(Kernel, kernel);

	cb(result);
};

exports.deleteKernels = async(kernels, cb) => {
	const results = await dbAPI.deleteEntitiesByIDs(Kernel, kernels.map((k) => k.ID));

	cb(results);
};

exports.updateKernel = async(kernel, cb) => {
	const results = await dbAPI.updateEntity(Kernel, kernel);

	cb(results);
};

exports.countOperatingSystems = async(queryObj, cb) => {
	const results = await dbAPI.countOperatingSystems(queryObj);

	cb(results);
};

exports.createOperatingSystem = async(operatingSystem, cb) => {
	const result = await dbAPI.createOperatingSystem(operatingSystem);

	cb(result);
};

exports.deleteOperatingSystems = async(operatingSystems, cb) => {
	const results = await dbAPI.deleteEntitiesByIDs(OperatingSystem, operatingSystems.map((o) => o.ID));

	cb(results);
};

exports.updateOperatingSystem = async(operatingSystem, cb) => {
	const results = await dbAPI.updateEntity(OperatingSystem, operatingSystem);

	cb(results);
};

exports.getAllArtifacts = async(queryObj, cb) => {
	const results = await dbAPI.getAllArtifacts(queryObj);

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

exports.getRequirements = async(component, version, cb) => {
	const results = await dbAPI.getRequirements(component, version);

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

	cb(results.data?.length ? results.data[0] : results);
};

exports.createArtifact = async(artifact, cb) => {
	const result = await dbAPI.createArtifact(artifact);

	cb(result);
};

exports.deleteArtifacts = async(artifacts, cb) => {
	const results = await dbAPI.deleteArtifacts(artifacts);

	cb(results);
};

exports.updateArtifact = async(artifact, cb) => {
	const results = await dbAPI.updateArtifact(artifact);

	cb(results);
};

exports.countArtifacts = async(queryObj, cb) => {
	const results = await dbAPI.countEntities(Artifact, queryObj);

	cb(results);
};

exports.countReleases = async(queryObj, cb) => {
	const results = await dbAPI.countEntities(Release, queryObj);

	cb(results);
};

exports.getAllReleases = async(queryObj, cb) => {
	const results = await dbAPI.getAllReleases(queryObj);

	cb(results);
};

exports.createRelease = async(release, cb) => {
	const results = await dbAPI.createRelease(release);

	cb(results);
};

exports.updateRelease = async(release, cb) => {
	const results = await dbAPI.updateRelease(release);

	cb(results);
};

exports.deleteReleases = async(releases, cb) => {
	const results = await dbAPI.deleteReleases(releases);

	cb(results);
};
