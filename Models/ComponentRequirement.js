const { DataTypes } = require('sequelize');
const { Component } = require('./Component.js');
const { ComponentVersion } = require('./ComponentVersion.js');

exports.ComponentRequirement = (sequelize) => {
	let componentRequirement = sequelize.define(
		'ComponentRequirement', {
			// Model attributes are defined here
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			}
		}, {
			tableName: 'ComponentRequirement',
			timestamps: false
		}
	);

	componentRequirement.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'componentVersion'
	});

	componentRequirement.belongsTo(Component(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'component'
	});

	return componentRequirement;
}