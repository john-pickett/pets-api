require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/db.js');
const sequelize = db.sequelize;
const Dog = db.models.Dog;
const Cat = db.models.Cat;

const app = express();
const port = 3000;
const seedData = require('./db/seedDB.js')

app.use(bodyParser.json());

const eraseDatabaseOnSync = true;

sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
    if (eraseDatabaseOnSync) {
        // seed DB with data
       seedData.createDataInDB()
    }
	app.listen(process.env.PORT || port, () => {
		console.log(`Server running on port ${port}.`)
	});
});

app.get('/', (req, res) => {
	res.send('Hello from the pets app')
});

app.get('/dogs', (req, res) => {
	Dog.findAll().then((dogs) => {
		res.send(dogs)
	})
});

app.get('/cats', (req, res) => {
	Cat.findAll().then((cats) => {
		res.send(cats)
	})
});