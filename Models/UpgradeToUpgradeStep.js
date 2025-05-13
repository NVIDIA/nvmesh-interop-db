const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.UpgradeToUpgradeStep = (sequelize) => {
	return sequelize.define(
		tableNames.UPGRADE_TO_UPGRADE_STEP, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
            stepIndex: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
		}, {
			tableName: tableNames.UPGRADE_TO_UPGRADE_STEP,
			timestamps: false
		}
	);
}