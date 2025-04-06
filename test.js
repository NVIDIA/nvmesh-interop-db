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
	interopDB.getAllSetups({
		sort: { 'ofed.version': '5.4-3.5.8.0' },
		filter: { 'description': { $regex: 'd', $option: 'i' } },
		skip: 0,
		limit: 10
	}, (setups) => {
			if (setups.error)
				return console.log('ERROR: ', setups.error);

			for (let setup of setups.data) {
				console.log(JSON.stringify(setup));
			}
		}
	);

	/*interopDB.deleteSetups([{ ID: '2' }, { ID: '3' }], (results) => {
		console.log(results);
	});*/

/*

	await interopDB.createSetup({
		name: 'Create test',
		description: 'new description',
		archTypeID: 2,
		kernelID: 8,
		ofedID: 4,
		operatingSystemID: 1
	}, (setup) => {
		console.log('created', setup);
	});

	interopDB.deleteSetupById(6, (results) => {
		console.log(results);
	});

	interopDB.updateSetup({
		ID: 2,
		name: 'Create test',
		description: 'new description',
		archTypeID: 2,
		kernelID: 9,
		ofedID: 16,
		operatingSystemID: 1
	}, (results) => {
		console.log(results);
	})

	*/

	/*

	interopDB.getAllReleases({
		filter: { ID: 6 }
	}, (results) => {
		if (results)
			if (results.error)
				return console.log('ERROR: ', results.error);

			for (let result of results.data) {
				console.log(JSON.stringify(result));
			}
	});

	interopDB.deleteReleases([{ ID: 6 }], (results) => {
		console.log(results);
	});
	*/
/*

*/
	interopDB.getSupportedKafkaTopics('nvmesh-management', '3.1.0', (res) =>  {
		console.log(JSON.stringify(res));
	});
/*
	interopDB.createRelease({
		version: "1.0.0",
		setups: [
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
		"setups":[],
		"requirements":[],
		"compatibilities":[{"ID":7,"version":"14.21.3","componentId":8,"component":{"id":8,"ID":8,"name":"nodeJS","componentTypeID":4,"componentType":{"ID":4,"name":"THIRD_PARTY"}},"setups":[],"requirements":[],"compatibilities":[]}]
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
			"setups":[{
				"ID":1,
				"name":"SetupName",
				"description":"Setup description",
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
	interopDB.getAllComponentSetups((results) => {
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
}

test();
