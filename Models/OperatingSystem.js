const { DataTypes } = require('sequelize');
const { DistributionType } = require('./DistributionType');
const { tableAssociations, tableNames } = require('../consts');

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

	operatingSystem.belongsTo(DistributionType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.DISTRIBUTION_TYPE
	});

	return operatingSystem;
}