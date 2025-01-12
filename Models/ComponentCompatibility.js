const { DataTypes } = require('sequelize');
const { ComponentVersion } = require('./ComponentVersion.js');

exports.ComponentCompatibility = (sequelize) => {
	let componentCompatibility = sequelize.define(
		'ComponentCompatibility', {
			// Model attributes are defined here
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			}
		}, {
			tableName: 'ComponentCompatibility',
			timestamps: false
		}
	);

	componentCompatibility.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'sourceVersion'
	});

	componentCompatibility.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'destinationVersion'
	});

	return componentCompatibility;
}