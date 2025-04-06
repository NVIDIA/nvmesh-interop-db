const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

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

	return component;
}