require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/db.js');
const sequelize = db.sequelize;
const Dog = db.models.Dog;
const Cat = db.models.Cat;

const app = express();
const port = 3000;
const seedData = require('./db/seedDB');

app.use(bodyParser.json());

const eraseDatabaseOnSync = false;

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
	});
});

app.get('/dogs/:id', (req, res) => {
	const id = req.params.id;
	Dog.findOne({
		where: {
			id: id
		}
	}).then((dog) => {
		if (!dog) {
			res.status(404)
		}
		res.send(JSON.stringify(dog))
	}).catch((err) => {
		res.status(400)
		res.send(err)
	});
});

app.post('/dogs', (req, res) => {
	const name = req.body.name;
	const breed = req.body.breed;

	const newDog = Dog.build({
		name: name,
		breed: breed
	});

	newDog.save().then((dog) => {
		res.send('Dog saved: ' + JSON.stringify(dog))
	})
});

app.put('/dogs/:id', (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const breed = req.body.breed;

	Dog.update({
		name: name,
		breed: breed
	}, { 
		returning: true,
		where: { id }
	}).then((dog) => {
		res.send(JSON.stringify(dog[1]))
	}).catch((err) => {
		res.status(400)
		res.send(err)
	});
});

app.delete('/dogs/:id', (req, res) => {
	const id = req.params.id;

	Dog.findOne({
		where: { id }
	}).then((dog) => {
		dog.destroy().then((record) => {
			res.send('Record id: ' + id + ' was deleted.')
		})
	})
});

app.get('/cats', (req, res) => {
	Cat.findAll().then((cats) => {
		res.send(cats)
	});
});

app.get('/cats/:id', (req, res) => {
	const id = req.params.id;
	Cat.findOne({
		where: {
			id: id
		}
	}).then((cat) => {
		if (!cat) {
			res.status(404)
		}
		res.send(JSON.stringify(cat))
	}).catch((err) => {
		res.status(400)
		res.send(err)
	});
});

app.post('/cats', (req, res) => {
	const name = req.body.name;
	const breed = req.body.breed;

	const newCat = Cat.build({
		name: name,
		breed: breed
	});

	newCat.save().then((cat) => {
		res.send('Cat saved: ' + JSON.stringify(cat))
	})
});

app.put('/cats/:id', (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const breed = req.body.breed;

	Cat.update({
		name: name,
		breed: breed
	}, { 
		returning: true,
		where: { id }
	}).then((cat) => {
		res.send(JSON.stringify(cat[1]))
	}).catch((err) => {
		res.status(400)
		res.send(err)
	});
});

app.delete('/cats/:id', (req, res) => {
	const id = req.params.id;

	Cat.findOne({
		where: { id }
	}).then((cat) => {
		cat.destroy().then((record) => {
			res.send('Record id: ' + id + ' was deleted.')
		})
	})
});