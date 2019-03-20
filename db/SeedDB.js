const db = require('./db');
const sequelize = db.sequelize;

const Dog = db.models.Dog;
const Cat = db.models.Cat;

const dogNames = ['Spot', 'Rex', 'Max', 'Charlie', 'Buddy', 'Jack', 'Rocky', 'Oliver', 'Lola', 'Bear', 'Sadie', 'Duke', 'Tucker', 'Bella', 'Daisy', 'Luna', 'Molly', 'Maggie'
, 'Baily', 'Sophie', 'Terri'];

const dogBreeds = ['Yorkshire Terrier', 'Golden Lab', 'Akita', 'Foxhound', 'German Shepherd', 'English Bulldog', 'Beagle', 'Boxer', 'Poodle', 'Pointer', 'Husky', 'Rottweiler', 
'Corgy', 'Boston Terrier', 'Pomeranian', 'Sheepdog', 'Brittany', 'Maltese', 'Chihuahua', 'Weimaraner'];

const catNames = ['Oscar', 'Tiger', 'Sam', 'Misty', 'Simba', 'Coco', 'Chloe', 'Missy', 'Tigger', 'Smokey', 'Milo', 'Cleo', 'Sooty', 'Monty', 'Felix', 'Lucky', 'Casper', 
'Thomas', 'Toby', 'Ginger'];

const catBreeds = ['Russian Blue', 'Persian', 'Scottish Fold', 'Siamese', 'Maine Coon', 'British Shorthair', 'Munchkin', 'Ragdoll', 'Abyssinian', 'Turkish Angora', 'Norwegian Forest', 'Bengal', 'Birman', 'Himalayan', 'Savannah',
'Egyptian Mau', 'Burmese', 'Manx', 'American Shorthair', 'Toyger']

const random = () => Math.floor(Math.random() * 20)

const createDataInDB = async () => {

	for (var i = 0; i < 20; i ++) {
		await Dog.create({
			name: dogNames[random()],
			breed: dogBreeds[random()]
		})
	}

	for (var j = 0; j < 20; j ++) {
		await Cat.create({
			name: catNames[random()],
			breed: catBreeds[random()]
		})
	}


}


module.exports = { createDataInDB };