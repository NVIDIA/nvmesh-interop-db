const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts');

exports.Upgrade = (sequelize) => {
	let upgrade = sequelize.define(
		tableNames.UPGRADE, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			}
		}, {
			tableName: tableNames.UPGRADE,
			timestamps: false
		}
	);

	return upgrade;
};