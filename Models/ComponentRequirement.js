/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.ComponentRequirement = (sequelize) => {
	let componentRequirement = sequelize.define(
		tableNames.COMPONENT_REQUIREMENT, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			}
		}, {
			tableName: tableNames.COMPONENT_REQUIREMENT,
			timestamps: false
		}
	);

	return componentRequirement;
}
