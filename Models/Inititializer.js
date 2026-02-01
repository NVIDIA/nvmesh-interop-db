/*
 * SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const { tableAssociations } = require('../consts.js');
const { ComponentCompatibility } = require('./ComponentCompatibility.js');
const { ComponentVersion } = require('./ComponentVersion.js');
const { Component } = require('./Component.js');
const { ArchType } = require('./ArchType.js');
const { ComponentRequirement } = require('./ComponentRequirement.js');
const { ComponentType } = require('./ComponentType.js');
const { ComponentVersionPlatform } = require('./ComponentVersionPlatform.js');
const { Platform } = require('./Platform.js');
const { DistributionType } = require('./DistributionType');
const { Kernel } = require('./Kernel.js');
const { Ofed } = require('./Ofed.js');
const { OperatingSystem } = require('./OperatingSystem.js');
const { Upgrade } = require('./Upgrade.js');
const { UpgradeType } = require('./UpgradeType.js');
const { Release } = require('./Release.js');
const { UpgradeStep } = require('./UpgradeStep.js');
const { UpgradeToUpgradeStep } = require('./UpgradeToUpgradeStep.js');
const { Artifact } = require('./Artifact.js');
const { ReleaseArtifact } = require('./ReleaseArtifact.js');
const { ArtifactPlatform } = require('./ArtifactPlatform.js');
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

	componentRequirement.belongsTo(Component(sequelize), {
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

	componentVersion.belongsToMany(Platform(sequelize), {
		through: {
			model: ComponentVersionPlatform(sequelize),
		},
		foreignKey: 'componentVersionID',
		otherKey: 'platformID',
		as: 'platforms'
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

exports.ComponentVersionPlatform = (sequelize) => {
	return ComponentVersionPlatform(sequelize);
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

exports.Platform = (sequelize) => {
	const platform = Platform(sequelize);

	platform.belongsTo(ArchType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.ARCH_TYPE
	});

	platform.belongsTo(OperatingSystem(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.OPERATING_SYSTEM
	});

	platform.belongsTo(Kernel(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.KERNEL
	});

	platform.belongsTo(Ofed(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: tableAssociations.OFED
	});

	return platform;
};

exports.UpgradeStep = (sequelize) => {
	return UpgradeStep(sequelize);
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

	upgrade.belongsToMany(UpgradeStep(sequelize), {
		through: {
			model: UpgradeToUpgradeStep(sequelize),
		},
		foreignKey: 'upgradeID',
		otherKey: 'upgradeStepID',
		as: 'steps'
	});

	return upgrade;
};

exports.UpgradeType = (sequelize) => {
	return UpgradeType(sequelize);
};

exports.Release = (sequelize) => {
	const release = Release(sequelize);

	release.belongsToMany(Artifact(sequelize), {
		through: {
			model: ReleaseArtifact(sequelize),
		},
		foreignKey: 'releaseID',
		otherKey: 'artifactID',
		as: 'artifacts'
	});

	return release;
};

exports.ReleaseArtifact = (sequelize) => {
	return ReleaseArtifact(sequelize);
};

exports.ArtifactPlatform = (sequelize) => {
	return ArtifactPlatform(sequelize);
};

exports.Artifact = (sequelize) => {
	const artifact = Artifact(sequelize);

	artifact.belongsToMany(Platform(sequelize), {
		through: {
			model: ArtifactPlatform(sequelize),
		},
		foreignKey: 'artifactID',
		otherKey: 'platformID',
		as: 'platforms'
	});

	return artifact;
};
