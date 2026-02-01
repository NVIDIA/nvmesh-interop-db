/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { DataTypes, } = require('sequelize');
const { tableNames } = require('../consts');

exports.Kernel = (sequelize) => {
	return sequelize.define(
		tableNames.KERNEL, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			version: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			tableName: tableNames.KERNEL,
			timestamps: false
		}
	);
}
