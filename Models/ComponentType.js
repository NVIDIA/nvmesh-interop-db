const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.ComponentType = (sequelize) => {
	return sequelize.define(
		tableNames.COMPONENT_TYPE, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: tableNames.COMPONENT_TYPE,
			timestamps: false
		}
	);
}