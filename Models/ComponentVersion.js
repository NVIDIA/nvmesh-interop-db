const { DataTypes } = require('sequelize');
const { Component } = require('./Component.js');
const { Setup } = require('./Setup.js');
const { tableNames, tableAssociations } = require('../consts.js');

exports.ComponentVersion = (sequelize) => {
	let componentVersion = sequelize.define(
		tableNames.COMPONENT_VERSION, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: tableNames.COMPONENT_VERSION,
			timestamps: false
		}
	);

	componentVersion.belongsTo(Component(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT
	});

	componentVersion.belongsToMany(Setup(sequelize), {
		through: tableAssociations.COMPONENT_VERSION_SETUP,
		foreignKey: 'componentVersionID',
		otherKey: 'setupID',
		as: 'setups'
	});

	return componentVersion;
}