const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts');

exports.OperatingSystem = (sequelize) => {
	let operatingSystem = sequelize.define(
		tableNames.OPERATING_SYSTEM, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: tableNames.OPERATING_SYSTEM,
			timestamps: false
		}
	);

	return operatingSystem;
}