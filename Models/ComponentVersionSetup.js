const { DataTypes } = require('sequelize');
const { tableNames, tableAssociations } = require('../consts.js');

exports.ComponentVersionSetups = (sequelize) => {
	let componentSetup = sequelize.define(
		tableNames.COMPONENT_VERSION_SETUP, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			}
		}, {
			tableName: tableNames.COMPONENT_VERSION_SETUP,
			timestamps: false
		}
	);

	return componentSetup;
}