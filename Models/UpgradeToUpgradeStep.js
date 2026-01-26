/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.UpgradeToUpgradeStep = (sequelize) => {
	return sequelize.define(
		tableNames.UPGRADE_TO_UPGRADE_STEP, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
            stepIndex: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
		}, {
			tableName: tableNames.UPGRADE_TO_UPGRADE_STEP,
			timestamps: false
		}
	);
}
