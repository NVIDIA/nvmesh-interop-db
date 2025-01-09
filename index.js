const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: '/home/tomzan/Downloads/interopDB/InteropDB'
});

exports.testConnection = async () => {
	try {
		await sequelize.authenticate();
		return sequelize;
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

exports.printMsg = (msg) => {
	console.log(`printMsg invoked with ${msg}`);
};
