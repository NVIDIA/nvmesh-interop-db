const { DataTypes } = require('sequelize');

exports.ComponentType = (sequelize) => {
	return sequelize.define(
		'ComponentType', {
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
			tableName: 'ComponentType',
			timestamps: false
		}
	);
}