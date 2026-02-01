/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.ComponentCompatibility = (sequelize) => {
	let componentCompatibility = sequelize.define(
		tableNames.COMPONENT_COMPATIBILITY, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			}
		}, {
			tableName: tableNames.COMPONENT_COMPATIBILITY,
			timestamps: false
		}
	);

	return componentCompatibility;
}
