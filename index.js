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

exports.getSupportedTopicsByVersion = async (version, cb) => {
	const topics = await dbAPI.getSupportedKafkaTopics(components.MANAGEMENT, version);

	cb(topics);
};

exports.getAllArchTypes = async(cb) => {
	const entities = await dbAPI.getAllArchTypes(ArchType);

	cb(entities);
};

exports.getAllOperatingSystems = async(cb) => {
	const entities = await dbAPI.getAllOperatingSystems(OperatingSystem);

	cb(entities);
};

exports.getAllKernels = async(cb) => {
	const entities = await dbAPI.getAllKernels(Kernel);

	cb(entities);
};

exports.getAllOfeds = async(cb) => {
	const entities = await dbAPI.getAllOfeds(Ofed);

	cb(entities);
};

exports.getAllSetups = async(cb) => {
	const setups = await dbAPI.getAllSetups();

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

exports.updateSetup = async(setup, cb) => {
	const results = await dbAPI.updateSetup(setup);

	cb(results);
}

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
