const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts');

exports.DistributionType = (sequelize) => {
	return sequelize.define(
		tableNames.DISTRIBUTION_TYPE, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: tableNames.DISTRIBUTION_TYPE,
			timestamps: false
		}
	);
}