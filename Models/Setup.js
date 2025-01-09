const { DataTypes } = require('sequelize');
const { ArchType } = require('./ArchType.js');
const { OperatingSystem } = require('./OperatingSystem.js');
const { Kernel } = require('./Kernel.js');
const { Ofed } = require('./Ofed.js');

exports.Setup = (sequelize) => {
	let setup = sequelize.define(
		'Setup', {
			// Model attributes are defined here
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			}
		}, {
			tableName: 'Setup',
			timestamps: false
		}
	);

	setup.belongsTo(ArchType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'archType'
	});

	setup.belongsTo(OperatingSystem(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'operatingSystem'
	});

	setup.belongsTo(Kernel(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'kernel'
	});

	setup.belongsTo(Ofed(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'ofed'
	});

	return setup;
}