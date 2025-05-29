const interopDB = require('./index.js');
const { ArchType } = require('./Models/ArchType.js');

async function test() {
	await interopDB.connect('/home/tomzan/projects/interop-db/InteropDB');

	/*
	await interopDB.logAllEntities();
	interopDB.getSupportedTopicsByVersion('3.1.0', (topics) => {
		console.log(topics);
	});

	interopDB.getAllArchTypes((archTypes) => {
		console.log(JSON.stringify(archTypes));
	});

	interopDB.getAllOfeds((ofeds) => {
		console.log(JSON.stringify(ofeds));
	});

	interopDB.getAllKernels((kernels) => {
		console.log(JSON.stringify(kernels));
	});


	interopDB.getAllOperatingSystems((operatingSystems) => {
		console.log(JSON.stringify(operatingSystems));
	});
	interopDB.getAllPlatforms({
		sort: { 'ofed.version': '5.4-3.5.8.0' },
		filter: { 'description': { $regex: 'd', $option: 'i' } },
		skip: 0,
		limit: 10
	}, (platforms) => {
			if (platforms.error)
				return console.log('ERROR: ', platforms.error);

			for (let platform of platforms.data) {
				console.log(JSON.stringify(platform));
			}
		}
	);

	/*

	interopDB.deletePlatforms([{ ID: '4' }], (results) => {
		console.log(results);
	});

/*

	await interopDB.createPlatform({
		name: 'Create test',
		description: 'new description',
		archTypeID: 2,
		kernelID: 8,
		ofedID: 4,
		operatingSystemID: 1
	}, (platform) => {
		console.log('created', platform);
	});

	interopDB.deletePlatformById(6, (results) => {
		console.log(results);
	});

	interopDB.updatePlatform({
		ID: 2,
		name: 'Create test',
		description: 'new description',
		archTypeID: 2,
		kernelID: 9,

		console.log(results);
	})

	*/

	/*
	interopDB.getSupportedMongoCollections('3.1.0', (collections) => {
		console.log(JSON.stringify(collections));
	});
	*/

	/*const query = JSON.parse('{"filter":{"component.name":{"$regex":"nvmesh-client","$options":"i"}},"sort":{},"skip":0,"limit":10}');
	interopDB.getAllReleases(query, (results) => {
		if (results)
			if (results.error)
				return console.log('ERROR: ', results.error);

			for (let result of results.data) {
				console.log(JSON.stringify(result));
			}
	});

	/*
	interopDB.deleteReleases([{ ID: 6 }], (results) => {
		console.log(results);
	});
	interopDB.getSupportedKafkaTopics('managementFeatureCompatibility', '1', (res) =>  {
		console.log(JSON.stringify(res));
	});

	interopDB.createComponentVersion({
		version: "7.7.7",
		platforms: [
		],
		requirements: [
		],
		compatibilities: [
		],
		componentID: 17,
		componentTypeID: 2,
	  }, (results) => {
		console.log(results);
	});
/*
	interopDB.updateRelease({
		"ID":6,
		"version":"7.0.16",
		"componentId":7,
		"component":{"id":7,"ID":7,"name":"mongoDB","componentTypeID":4,"componentType":{"ID":4,"name":"THIRD_PARTY"}},
		"platforms":[],
		"requirements":[],
		"compatibilities":[{"ID":7,"version":"14.21.3","componentId":8,"component":{"id":8,"ID":8,"name":"nodeJS","componentTypeID":4,"componentType":{"ID":4,"name":"THIRD_PARTY"}},"platforms":[],"requirements":[],"compatibilities":[]}]
	}, (results) => {
		console.log(results);
	});

	interopDB.updateRelease({
			"ID":1,
			"version":"3.1.0",
			"componentId":1,
			"component":{
				"id":1,
				"ID":1,
				"name":"nvmesh-client",
				"componentTypeID":1,
				"componentType":{"ID":1,
				"name":"NVMESH_PACKAGE"}
			},
			"platforms":[{
				"ID":1,
				"name":"PlatformName",
				"description":"Platform description",
				"archTypeID":1,
				"operatingSystemID":1,
				"kernelID":8,
				"ofedID":4
			}, {
				"ID":2,
				"name":"name2",
				"description":"new description2",
				"archTypeID":2,
				"operatingSystemID":1,
				"kernelID":9,
				"ofedID":5
			}, {
				"ID":3,
				"name":"dsfsdf",
				"description":"Vacation",
				"archTypeID":2,
				"operatingSystemID":3,
				"kernelID":3,
				"ofedID":5,
				"archType":{
					"ID":2,
					"name":"arm - BlueField2"
				},
				"operatingSystem":{
					"ID":3,
					"version":"8.6",
					"distributionTypeID":3,
					"distributionType":{
						"ID":3,
						"name":"ORACLE_LINUX"
					}
				},
				"kernel":{
					"ID":3,
					"version":"4.18.0-425.19.2.el8_lustre.x86_64"
				},
				"ofed":{
					"ID":5,
					"version":"5.4-3.5.8.0"
				}
			}]
		},
		(results) => {
			console.log(results);
		}
	);
	*/

	/*
	interopDB.getAllComponentPlatforms((results) => {
		if (results)
			if (results.error)
				return console.log('ERROR: ', results.error);

			for (let result of results.data) {
				console.log(JSON.stringify(result));
			}
	});

	/*
	interopDB.getAllComponentTypes((results) => {
		console.log(JSON.stringify(results));
	});

	*/
/*
	interopDB.getAllComponents({
		sort: {  },
		filter: { },
		skip: 0,
		limit: 0
	}, true, (results) => {
		console.log(JSON.stringify(results));
	});
*/
	/*
	interopDB.getComponentsByTypeID(1, (results) => {
		console.log(JSON.stringify(results));
	});
	*/

	//interopDB.countReleases((results) => { console.log(results); });

	//interopDB.countComponents((results) => { console.log(results); });

	/*
	interopDB.getPossibleUpgrades('3.1.0', (results) => {
		console.log(`ERROR: ${results.error}`);
		console.log(`DATA: ${JSON.stringify(results.data)}`);
	});
	*/

	/*interopDB.getUpgradeScenario('nvmesh-client', '3.1.0', '3.2.0-HF2', (results) => {
		console.log(`ERROR: ${results.error}`);
		console.log(`DATA: ${JSON.stringify(results.data)}`);
	});*/

	interopDB.getReleaseArtificatsForMachine('3.2.0-HF2', 'ubuntu', '20.04', '5.15.0-102-generic', '5.4-3.5.8.0', 'x86_64', (results) => {
		console.log(`ERROR: ${results.error}`);
		console.log(`DATA: ${JSON.stringify(results)}`);
	});
}

test();
