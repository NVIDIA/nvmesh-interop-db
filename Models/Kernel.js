const { DataTypes, } = require('sequelize');

exports.Kernel = (sequelize) => {
	return sequelize.define(
		'Kernel', {
			// Model attributes are defined here
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			tableName: 'Kernel',
			timestamps: false
		}
	);
}