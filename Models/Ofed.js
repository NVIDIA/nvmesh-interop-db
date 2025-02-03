const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts');

exports.Ofed = (sequelize) => {
	return sequelize.define(
		tableNames.OFED, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: tableNames.OFED,
			timestamps: false
		}
	);
}