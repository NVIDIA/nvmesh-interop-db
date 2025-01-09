const { DataTypes } = require('sequelize');

exports.ArchType = (sequelize) => {
	return sequelize.define(
		'ArchType', {
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
			tableName: 'ArchType',
			timestamps: false
		}
	);
}