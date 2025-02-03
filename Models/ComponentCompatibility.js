const { DataTypes } = require('sequelize');
const { ComponentVersion } = require('./ComponentVersion.js');
const { tableNames, tableAssociations } = require('../consts.js');

exports.ComponentCompatibility = (sequelize) => {
	let componentCompatibility = sequelize.define(
		tableNames.COMPONENT_COMPATIBILITY, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			}
		}, {
			tableName: tableNames.COMPONENT_COMPATIBILITY,
			timestamps: false
		}
	);

	componentCompatibility.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.SOURCE_VERSION
	});

	componentCompatibility.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.DESTINATION_VERSION
	});

	return componentCompatibility;
}