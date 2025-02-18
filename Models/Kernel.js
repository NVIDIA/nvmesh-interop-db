const { DataTypes, } = require('sequelize');
const { tableNames } = require('../consts');

exports.Kernel = (sequelize) => {
	return sequelize.define(
		tableNames.KERNEL, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			tableName: tableNames.KERNEL,
			timestamps: false
		}
	);
}