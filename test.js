const interopDB = require('./index.js');
const { ArchType } = require('./Models/ArchType.js');
const { DistributionType } = require('./Models/DistributionType.js');
const { Ofed } = require('./Models/Ofed.js');
const { OperatingSystem } = require('./Models/OperatingSystem.js');
const { Kernel } = require('./Models/Kernel.js');
const { Setup } = require('./Models/Setup.js');

function printModels(models) {
	for (let model of models)
		console.log(model.dataValues);
}

async function test() {
	sequelize = await interopDB.testConnection();

	try {
		let kernels = await Kernel(sequelize).findAll();

		console.log('Currnet Kernels:');
		printModels(kernels);

		let archTypes = await ArchType(sequelize).findAll();

		console.log('Currnet ArchTypes:');
		printModels(archTypes);

		let ofeds = await Ofed(sequelize).findAll();

		console.log('Currnet Ofeds:');
		printModels(ofeds);

		let distributionTypes = await DistributionType(sequelize).findAll();

		console.log('Currnet DistributionTypes:');
		printModels(distributionTypes);

		let operatingSystems = await OperatingSystem(sequelize).findAll({ include: 'distributionType' });

		console.log('Currnet OSes:');
		printModels(operatingSystems);

		let setups = await Setup(sequelize).findAll({ include: ['archType', 'operatingSystem', 'kernel', 'ofed'] });

		console.log('Currnet setups:');
		printModels(setups);

	} catch (error) {
		console.log(error);
	}
}

test();