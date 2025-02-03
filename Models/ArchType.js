const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.ArchType = (sequelize) => {
	return sequelize.define(
		tableNames.ARCH_TYPE, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: tableNames.ARCH_TYPE,
			timestamps: false
		}
	);
}