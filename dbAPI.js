const { Sequelize } = require('sequelize');
const { Component } = require('./Models/Component.js');
const { ComponentType } = require('./Models/ComponentType.js');
const { ComponentVersion } = require('./Models/ComponentVersion.js');
const { ComponentCompatibility } = require('./Models/ComponentCompatibility.js');
const { components, tableAssociations, componentTypes } = require('./consts.js');

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
}

exports.getComponentVersion = async(component, version) => {
	return await ComponentVersion(sequelize).findOne({
		where: { version: version }, 
		include: [{ model: Component(sequelize), where: { 'name': component }, as: tableAssociations.COMPONENT }] 
	});
};