const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.Platform = (sequelize) => {
	let platform = sequelize.define(
		tableNames.PLATFORM, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT
			}
		}, {
			tableName: tableNames.PLATFORM,
			timestamps: false
		}
	);

	return platform;
};