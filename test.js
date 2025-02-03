const interopDB = require('./index.js');

async function test() {
	await interopDB.connect('/home/tomzan/projects/interopDB/InteropDB');
	//await interopDB.logAllEntities();
	interopDB.getSupportedTopicsByVersion('3.1.0', (topics) => {
		console.log(topics);
	});
}

test();