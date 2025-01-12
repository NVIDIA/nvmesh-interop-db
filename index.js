const { Sequelize } = require('sequelize');
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

exports.connect = async (dbPath) => {
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
}

exports.logAllEntities = async () => {
	try {
		await printModel(Kernel);

		let models = [Kernel, ArchType, Ofed, DistributionType, OperatingSystem, Setup, ComponentType, Component, ComponentVersion, ComponentCompatibility, ComponentRequirement];

		Promise.all(models.map(m => printModel(m)));
	} catch (error) {
		console.log(error);
	}
}

exports.printMsg = (msg) => {
	console.log(`printMsg invoked with ${msg}`);
};
