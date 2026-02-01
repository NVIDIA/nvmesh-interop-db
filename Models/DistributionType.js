/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts');

exports.DistributionType = (sequelize) => {
	return sequelize.define(
		tableNames.DISTRIBUTION_TYPE, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			tableName: tableNames.DISTRIBUTION_TYPE,
			timestamps: false
		}
	);
}
