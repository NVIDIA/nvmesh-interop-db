const { DataTypes } = require('sequelize');
const { Component } = require('./Component');
const { tableNames, tableAssociations } = require('../consts.js');

exports.ComponentVersion = (sequelize) => {
	let componentVersion = sequelize.define(
		tableNames.COMPONENT_VERSION, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
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

	return componentVersion;
}