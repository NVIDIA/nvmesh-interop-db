const { DataTypes } = require('sequelize');
const { ComponentType } = require('./ComponentType.js');
const { tableNames, tableAssociations } = require('../consts.js');

exports.Component = (sequelize) => {
	let component = sequelize.define(
		tableNames.COMPONENT, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: tableNames.COMPONENT,
			timestamps: false
		}
	);

	component.belongsTo(ComponentType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT_TYPE
	});

	return component;
}