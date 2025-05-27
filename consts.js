exports.tableNames = {
	ARCH_TYPE: 'ArchType',
	COMPONENT: 'Component',
	COMPONENT_COMPATIBILITY: 'ComponentCompatibility',
	COMPONENT_REQUIREMENT: 'ComponentRequirement',
	COMPONENT_TYPE: 'ComponentType',
	COMPONENT_VERSION: 'ComponentVersion',
	DISTRIBUTION_TYPE: 'DistributionType',
	KERNEL: 'Kernel',
	OFED: 'Ofed',
	OPERATING_SYSTEM: 'OperatingSystem',
	PLATFORM: 'Platform',
	COMPONENT_VERSION_PLATFORM: 'ComponentVersionPlatform',
	UPGRADE_TYPE: 'UpgradeType',
	UPGRADE: 'Upgrade',
	RELEASE: 'Release',
	UPGRADE_STEP: 'UpgradeStep',
	UPGRADE_TO_UPGRADE_STEP: 'UpgradeToUpgradeStep',
	ARTIFACT: 'Artifact',
	RELEASE_ARTIFACT: 'ReleaseArtifact'
};

exports.tableAssociations = {
	COMPONENT_TYPE: 'componentType',
	SOURCE_VERSION: 'sourceVersion',
	DESTINATION_VERSION: 'destinationVersion',
	COMPONENT: 'component',
	COMPONENT_VERSION: 'componentVersion',
	DISTRIBUTION_TYPE: 'distributionType',
	ARCH_TYPE: 'archType',
	OPERATING_SYSTEM: 'operatingSystem',
	KERNEL: 'kernel',
	OFED: 'ofed',
	PLATFORM: 'platform',
	COMPONENT_VERSION_PLATFORM: 'componentVersionPlatform',
	UPGRADE_TYPE: 'upgradeType',
	UPGRADE: 'upgrade',
	RELEASE: 'release',
	UPGRADE_STEP: 'upgradeStep',
	UPGRADE_TO_UPGRADE_STEP: 'upgradeToUpgradeStep',
	ARTIFACT: 'artifact',
	RELEASE_ARTIFACT: 'releaseArtifact'
};

exports.components = {
	MANAGEMENT: 'nvmesh-management',
	CLIENT: 'nvmesh-client',
	TARGET: 'nvmesh-target'
};

exports.componentTypes = {
	KAFKA_TOPIC: 'KAFKA_TOPIC',
	MONGO_COLLECTION: 'MONGODB_COLLECTION'
};