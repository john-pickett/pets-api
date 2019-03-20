const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres'
});

const models = {
	Dog: sequelize.import('../models/dogs'),
    Cat: sequelize.import('../models/cats')
}


module.exports = { sequelize, models };