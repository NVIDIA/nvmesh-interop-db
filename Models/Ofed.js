const { DataTypes } = require('sequelize');

exports.Ofed = (sequelize) => {
	return sequelize.define(
		'Ofed', {
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
			tableName: 'Ofed',
			timestamps: false
		}
	);
}