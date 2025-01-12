const interopDB = require('./index.js');

async function test() {
	await interopDB.connect('/home/tomzan/Downloads/interopDB/InteropDB');
	await interopDB.logAllEntities();
}

test();