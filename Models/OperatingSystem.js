const { DataTypes } = require('sequelize');
const { DistributionType } = require('./DistributionType');

exports.OperatingSystem = (sequelize) => {
	let operatingSystem = sequelize.define(
		'OperatingSystem', {
			// Model attributes are defined here
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: 'OperatingSystem',
			timestamps: false
		}
	);

	operatingSystem.belongsTo(DistributionType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'distributionType'
	});

	return operatingSystem;
}