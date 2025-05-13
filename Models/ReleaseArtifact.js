const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.ReleaseArtifact = (sequelize) => {
	return sequelize.define(
		tableNames.RELEASE_ARTIFACT, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			}
		}, {
			tableName: tableNames.RELEASE_ARTIFACT,
			timestamps: false
		}
	);
}