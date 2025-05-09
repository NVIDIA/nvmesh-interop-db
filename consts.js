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
	SETUP: 'Setup',
	COMPONENT_VERSION_SETUP: 'ComponentVersionSetup',
	UPGRADE_TYPE: 'UpgradeType',
	UPGRADE: 'Upgrade',
	RELEASE: 'Release'
}

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
	SETUP: 'setup',
	COMPONENT_VERSION_SETUP: 'ComponentVersionSetup',
	UPGRADE_TYPE: 'upgradeType',
	UPGRADE: 'upgrade',
	RELEASE: 'release'
}

exports.components = {
	MANAGEMENT: 'nvmesh-management'

}

exports.componentTypes = {
	KAFKA_TOPIC: 'KAFKA_TOPIC',
	MONGO_COLLECTION: 'MONGODB_COLLECTION'
}