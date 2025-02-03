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
	SETUP: 'Setup'
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
	OFED: 'ofed'
}

exports.components = {
	MANAGEMENT: 'nvmesh-management'

}

exports.componentTypes = {
	KAFKA_TOPIC: 'KAFKA_TOPIC'
}