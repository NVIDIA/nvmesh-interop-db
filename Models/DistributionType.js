const { DataTypes } = require('sequelize');

exports.DistributionType = (sequelize) => {
	return sequelize.define(
		'DistributionType', {
			// Model attributes are defined here
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: 'DistributionType',
			timestamps: false
		}
	);
}