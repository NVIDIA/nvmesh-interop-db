const interopDB = require('./index.js');
const { ArchType } = require('./Models/ArchType.js');

async function test() {
	await interopDB.connect('/home/tomzan/projects/interopDB/InteropDB');

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

	interopDB.getAllReleases({
		sort: { 'component.componentType.name': 1 }
	}, (results) => {
		if (results)
			if (results.error)
				return console.log('ERROR: ', results.error);

			for (let result of results.data) {
				console.log(JSON.stringify(result));
			}
	});

	*/

	interopDB.getAllComponentTypes((results) => {
		console.log(JSON.stringify(results));
	});

	interopDB.getAllComponents((results) => {
		console.log(JSON.stringify(results));
	});

	interopDB.getComponentsByTypeID(1, (results) => {
		console.log(JSON.stringify(results));
	});
}

test();