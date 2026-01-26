/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.ArtifactPlatform = (sequelize) => {
	const artifactPlatform = sequelize.define(
		tableNames.ARTIFACT_PLATFORM, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			}
		}, {
			tableName: tableNames.ARTIFACT_PLATFORM,
			timestamps: false
		}
	);

	return artifactPlatform;
}
