/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.ComponentVersionPlatform = (sequelize) => {
	let componentVersionPlatform = sequelize.define(
		tableNames.COMPONENT_VERSION_PLATFORM, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			}
		}, {
			tableName: tableNames.COMPONENT_VERSION_PLATFORM,
			timestamps: false
		}
	);

	return componentVersionPlatform;
}
