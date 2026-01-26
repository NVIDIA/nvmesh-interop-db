/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { DataTypes } = require('sequelize');
const { tableNames } = require('../consts.js');

exports.Artifact = (sequelize) => {
	return sequelize.define(
		tableNames.ARTIFACT, {
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
            tableName: tableNames.ARTIFACT,
            timestamps: false
        }
	);
};
