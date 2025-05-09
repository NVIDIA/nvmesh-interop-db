const { tableAssociations } = require('../consts.js');
const { ComponentCompatibility } = require('./ComponentCompatibility.js');
const { ComponentVersion } = require('./ComponentVersion.js');
const { Component } = require('./Component.js');
const { ArchType } = require('./ArchType.js');
const { ComponentRequirement } = require('./ComponentRequirement.js');
const { ComponentType } = require('./ComponentType.js');
const { ComponentVersionSetup } = require('./ComponentVersionSetup.js');
const { Setup } = require('./Setup.js');
const { DistributionType } = require('./DistributionType');
const { Kernel } = require('./Kernel.js');
const { Ofed } = require('./Ofed.js');
const { OperatingSystem } = require('./OperatingSystem.js');
const { Upgrade } = require('./Upgrade.js');
const { UpgradeType } = require('./UpgradeType.js');
const { Release } = require('./Release.js');
exports.ArchType = (sequelize) => {
	return ArchType(sequelize);
};

exports.Component = (sequelize) => {
	const component = Component(sequelize);

	component.belongsTo(ComponentType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT_TYPE
	});

	return component;
};

exports.ComponentCompatibility = (sequelize) => {
	const componentCompatibility = ComponentCompatibility(sequelize);

	componentCompatibility.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.SOURCE_VERSION,
		foreignKey: 'sourceVersionID'
	});

	componentCompatibility.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.DESTINATION_VERSION,
		foreignKey: 'destinationVersionID'
	});

	return componentCompatibility;
};

exports.ComponentRequirement = (sequelize) => {
	const componentRequirement = ComponentRequirement(sequelize);

	componentRequirement.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT_VERSION,
		foreignKey: 'componentVersionID'
	});

	componentRequirement.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT,
		foreignKey: 'componentID'
	});

	return componentRequirement;
};

exports.ComponentType = (sequelize) => {
	return ComponentType(sequelize);
};

exports.ComponentVersion = (sequelize) => {
	const componentVersion = ComponentVersion(sequelize);

	componentVersion.belongsTo(Component(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT,
		foreignKey: 'componentID'
	});

	componentVersion.belongsToMany(Setup(sequelize), {
		through: {
			model: ComponentVersionSetup(sequelize),
		},
		foreignKey: 'componentVersionID',
		otherKey: 'setupID',
		as: 'setups'
	});

	componentVersion.belongsToMany(Component(sequelize), {
		through: {
			model: ComponentRequirement(sequelize),
		},
		foreignKey: 'componentVersionID',
		otherKey: 'componentID',
		as: 'requirements'
	});

	componentVersion.belongsToMany(componentVersion, {
		through: {
			model: ComponentCompatibility(sequelize),
		},
		foreignKey: 'sourceVersionID',
		otherKey: 'destinationVersionID',
		as: 'compatibilities'
	});

	return componentVersion;
};

exports.ComponentVersionSetup = (sequelize) => {
	return ComponentVersionSetup(sequelize);
};

exports.DistributionType = (sequelize) => {
	return DistributionType(sequelize);
};

exports.Kernel = (sequelize) => {
	return Kernel(sequelize);
};

exports.Ofed = (sequelize) => {
	return Ofed(sequelize);
};

exports.OperatingSystem = (sequelize) => {
	const operatingSystem = OperatingSystem(sequelize);

	operatingSystem.belongsTo(DistributionType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.DISTRIBUTION_TYPE
	});

	return operatingSystem;
};

exports.Setup = (sequelize) => {
	const setup = Setup(sequelize);

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
};

exports.Upgrade = (sequelize) => {
	const upgrade = Upgrade(sequelize);

	upgrade.belongsTo(UpgradeType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.UPGRADE_TYPE
	});

	upgrade.belongsTo(Release(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.RELEASE,
		foreignKey: 'destinationReleaseID'
	});

	upgrade.belongsTo(ComponentVersion(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.COMPONENT_VERSION,
		foreignKey: 'sourceVersionID'
	});

	return upgrade;
};

exports.UpgradeType = (sequelize) => {
	return UpgradeType(sequelize);
};

exports.Release = (sequelize) => {
	return Release(sequelize);
};