const interopDB = require('./index.js');

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
	*/


	interopDB.getAllSetups((setups) => {
		console.log(JSON.stringify(setups));
	});

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
	*/
}

test();