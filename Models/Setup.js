const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.Setup = (sequelize) => {
	let setup = sequelize.define(
		tableNames.SETUP, {
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
			tableName: tableNames.SETUP,
			timestamps: false
		}
	);

	return setup;
};