const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.UpgradeType = (sequelize) => {
	return sequelize.define(
		tableNames.UPGRADE_TYPE, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: tableNames.UPGRADE_TYPE,
			timestamps: false
		}
	);
};