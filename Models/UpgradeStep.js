const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.UpgradeStep = (sequelize) => {
	return sequelize.define(
		tableNames.UPGRADE_STEP, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			command: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			timeout: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			verificationCommand: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			isVolumeAffected: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			arguments: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		}, {
			tableName: tableNames.UPGRADE_STEP,
			timestamps: false
		}
	);
}