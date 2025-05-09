const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts');

exports.Release = (sequelize) => {
	let release = sequelize.define(
		tableNames.RELEASE, {
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
			tableName: tableNames.RELEASE,
			timestamps: false
		}
	);

	return release;
};