const { DataTypes } = require('sequelize');
const { Component } = require('./Component.js');
const { ComponentVersionSetup } = require('./ComponentVersionSetup.js');
const { Setup } = require('./Setup.js');
const { tableNames, tableAssociations } = require('../consts.js');
const { ComponentRequirement } = require('./ComponentRequirement.js');
const { ComponentCompatibility } = require('./ComponentCompatibility.js');

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
		through: {
			model: ComponentVersionSetup(sequelize),
		},
		foreignKey: 'componentVersionID',
		otherKey: 'setupID',
		as: 'setups'
	});

	componentVersion.belongsToMany(Component(sequelize), {
		through: {
			model: ComponentRequirement(sequelize),
		},
		foreignKey: 'componentVersionID',
		otherKey: 'componentID',
		as: 'requirements'
	});

	componentVersion.belongsToMany(componentVersion, {
		through: {
			model: ComponentCompatibility(sequelize),
		},
		foreignKey: 'sourceVersionID',
		otherKey: 'destinationVersionID',
		as: 'compatibilities'
	});

	return componentVersion;
}