const os = require('os');
const interopDB = require('./index.js');
const { ArchType } = require('./Models/ArchType.js');

const path = require('path');
const fs = require('fs');

const interopDBPath = path.join(os.homedir(), 'projects', 'interop-db', 'InteropDB');


async function test() {
	await interopDB.connect(interopDBPath);

	/*
	await interopDB.logAllEntities();
	interopDB.getSupportedTopicsByVersion('3.1.0', (topics) => {
		console.log(topics);
	});

	interopDB.getAllArchTypes((archTypes) => {
		console.log(JSON.stringify(archTypes));
	});
	*/

	/*interopDB.getAllOfeds({
		sort: { version: -1 },
		filter: { version: { $regex: 'inbox', $options: 'i' }},
		skip: 0,
		limit: 10
	},(ofeds) => {
		console.log(JSON.stringify(ofeds));
	});

	interopDB.getAllKernels({
		sort: { version: -1 },
		filter: { },
		skip: 0,
		limit: 10
	}, (kernels) => {
		console.log(JSON.stringify(kernels));
	});

	interopDB.getAllOperatingSystems({
		sort: { version: -1 },
		filter: { },
		skip: 0,
		limit: 10
	}, (operatingSystems) => {
		console.log(JSON.stringify(operatingSystems));
	});
/*
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

	interopDB.getSupportedKafkaTopics('nvmesh-management', '3.1.0', (res) =>  {
		if (res.error)
			return console.log('ERROR: ', res.error);

		console.log(JSON.stringify(res));
	});
	/*

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
/**/
	// interopDB.getAllComponents({
	// 	sort: { "component.name":1 },
	// 	filter: { },
	// 	skip: 0,
	// 	limit: 0
	// }, true, (results) => {
	// 	console.log(results.error);
	// 	console.log(JSON.stringify(results));
	// });

/*
	interopDB.getAllComponentVersions({
		sort: { 'componentVersion.version' : 1},
		filter: { },
		skip: 0,
		limit: 0
	}, (results) => {
		console.log(results.error || JSON.stringify(results.data[0].component.componentType.name));
	});

	/*
	interopDB.getComponentsByTypeID(1, (results) => {
		console.log(JSON.stringify(results));
	});
	*/

	/*
	interopDB.countReleases({}, (results) => { console.log(results); });

	interopDB.countComponents({}, (results) => { console.log(re

	interopDB.countComponentVersions({}, (results) => { console.log(results); });

	interopDB.countOfeds({}, (results) => {
		console.log(results);
	});

	interopDB.countKernels({}, (results) => {
		console.log(results);
	});

	interopDB.countOperatingSystems({}, (results) => {
		console.log(results);
	});/*

	interopDB.countArtifacts({}, (results) => {
		console.log(results);
	});

	interopDB.countReleases({}, (results) => {
		console.log(results);
	});

	/*interopDB.countPlatforms({"archType.name":{"$regex":"2","$options":"i"}}, (results) => {
		console.log(results);
	});

	/*
	interopDB.getPossibleUpgrades('3.1.0', (results) => {
		console.log(`ERROR: ${results.error}`);
		console.log(`DATA: ${JSON.stringify(results.data)}`);
	});

	interopDB.getUpgradeScenario('nvmesh-client', '3.3.0', '3.3.0-QA', (results) => {
		console.log(JSON.stringify(results));
	});

	/*
	interopDB.createOfed({
		version: '9.9.9'
	}, (results) => {
		console.log(results);
	});

	interopDB.deleteOfeds([{ ID: 10 }], (results) => {
		console.log(results);
	});
/*
	interopDB.updateOfed({
		ID: 10,
		version: '10.10.10'
	}, (results) => {
		console.log(results);
	});
	*/

	/*
	interopDB.createKernel({
		version: '11.11.11'
	}, (results) => {
		console.log(results);
	});

	interopDB.deleteKernels([{ ID: 21 }], (results) => {
		console.log(results);
	});

	interopDB.updateKernel({
		ID: 11,
		version: '11.11.12'
	}, (results) => {
		console.log(results);
	});


	interopDB.createOperatingSystem({
		distributionTypeID: 2,
		version: '12.12.12'
	}, (results) => {
		console.log(results);
	});
/*

	interopDB.deleteOperatingSystems([{ ID: 7 }], (results) => {
		console.log(results);
	});

	interopDB.updateOperatingSystem({
		ID: 7,
		version: '12.12.13'
	}, (results) => {
		console.log(results);
	});

	/*
	interopDB.getReleaseArtificatsForMachine('3.2.0-QA', 'rocky', '8.6', '4.18.0-372.19.1.el8_6.x86_64', 'inbox', 'x86_64', (results) => {
		console.log(`ERROR: ${results.error}`);
		console.log(`DATA: ${JSON.stringify(results)}`);
	});

	interopDB.getCompatibilities('nvmesh-client', 'NVMESH_PACKAGE', '3.1.0', (results) => {
		console.log(`ERROR: ${results.error}`);
		console.log(`DATA: ${JSON.stringify(results)}`);
	});
	*/

	/*
	interopDB.getAllArtifacts({
		sort: {},
		filter: {},
		skip: 0,
		limit: 0
	}, (artifacts) => {
		console.log(JSON.stringify(artifacts));
	});

	interopDB.getAllDistributionTypes({ filter: { ID: { $in: [1, 2] } } }, (distributionTypes) => {
		console.log(JSON.stringify(distributionTypes.data));
	});
/*

	interopDB.createArtifact({
		name: 'test.rpm',
		platforms: [
			{ ID: 8 },
			{ ID: 1 }
		]
	}, (artifact) => {
		console.log(artifact);
	});

	interopDB.updateArtifact({
		ID: 24,
		name: 'test.rpm',
		platforms: [
			{ ID: 8 }
		]
	}, (artifact) => {
		console.log(artifact);
	});

	interopDB.deleteArtifacts([{ ID: 24 }], (results) => {
		console.log(results);
	});

	interopDB.getAllReleases({
		sort: {},
		filter: {},
		skip: 0,
		limit: 0
	}, (releases) => {
		console.log(JSON.stringify(releases));
	});

	interopDB.createRelease({
		version: 'TEST',
		artifacts: [
			{ ID: 1 }
		]
	}, (release) => {
		console.log(release);
	});

	interopDB.updateRelease({
		ID: 6,
		version: 'TEST2',
		artifacts: [
			{ ID: 2 }
		]
	}, (release) => {
		console.log(release);
	});

	interopDB.deleteReleases([{ ID: 6 }], (results) => {
		console.log(results);
	});

	interopDB.getRequirements('nvmesh-client', '3.1.0', (results) => {
		console.log(results.data);
	});
	*/
}

test();
