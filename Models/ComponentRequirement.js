const { DataTypes } = require('sequelize');
const { Component } = require('./Component.js');
const { ComponentVersion } = require('./ComponentVersion.js');
const { tableNames, tableAssociations } = require('../consts.js');

exports.ComponentRequirement = (sequelize) => {
	let componentRequirement = sequelize.define(
		tableNames.COMPONENT_REQUIREMENT, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			}
		}, {
			tableName: tableNames.COMPONENT_REQUIREMENT,
			timestamps: false
		}
	);

	componentRequirement.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT_VERSION
	});

	componentRequirement.belongsTo(Component(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT
	});

	return componentRequirement;
}