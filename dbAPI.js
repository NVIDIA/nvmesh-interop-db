const { Sequelize } = require('sequelize');
const { Component } = require('./Models/Component.js');

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