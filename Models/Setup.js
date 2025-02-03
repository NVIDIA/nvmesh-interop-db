const { DataTypes } = require('sequelize');
const { ArchType } = require('./ArchType.js');
const { OperatingSystem } = require('./OperatingSystem.js');
const { Kernel } = require('./Kernel.js');
const { Ofed } = require('./Ofed.js');
const { tableNames, tableAssociations } = require('../consts.js');

exports.Setup = (sequelize) => {
	let setup = sequelize.define(
		tableNames.SETUP, {
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			}
		}, {
			tableName: tableNames.SETUP,
			timestamps: false
		}
	);

	setup.belongsTo(ArchType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.ARCH_TYPE
	});

	setup.belongsTo(OperatingSystem(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.OPERATING_SYSTEM
	});

	setup.belongsTo(Kernel(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.KERNEL
	});

	setup.belongsTo(Ofed(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.OFED
	});

	return setup;
}