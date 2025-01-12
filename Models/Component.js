const { DataTypes } = require('sequelize');
const { ComponentType } = require('./ComponentType.js');

exports.Component = (sequelize) => {
	let component = sequelize.define(
		'Component', {
			// Model attributes are defined here
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}, {
			tableName: 'Component',
			timestamps: false
		}
	);

	component.belongsTo(ComponentType(sequelize), {
		foreignKey: {
			allowNull: false
		},
		as: 'componentType'
	});

	return component;
}