const { DataTypes } = require('sequelize');
const { Component } = require('./Component');

exports.ComponentVersion = (sequelize) => {
	let componentVersion = sequelize.define(
		'ComponentVersion', {
			// Model attributes are defined here
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: 'ComponentVersion',
			timestamps: false
		}
	);

	componentVersion.belongsTo(Component(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'component'
	});

	return componentVersion;
}