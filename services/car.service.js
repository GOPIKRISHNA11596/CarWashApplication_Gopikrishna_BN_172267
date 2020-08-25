const db = require('../_helpers/db');
const Car = require('../models/car.model');
var rn = require('random-number');
var fs = require('fs');

var gen = rn.generator({
    min:  1234567891,
    max:  9874316514,
    integer: true
  });

module.exports = {
    getAll,
    getById,
    getByIdCarBrand,
    getById1,
    create,
    update,
    delete: _delete
};

//Add a car
async function create(carParam) {
    const car = new Car(carParam);
    var randomNumber= gen();//Generating Random number
    car.carID = randomNumber;
    await car.save();
}

//Get all cars
async function getAll() {
    return await Car.find();
}

//Get a car by username
async function getById(id) {
    return await Car.findOne({username : id});
}

async function getByIdCarBrand(carBrand) {
    return await Car.findOne({carBrand : carBrand});
}

//Get a car by ID
async function getById1(id) {
    return await Car.findOne({carID : id});
}

//Uppdate a car by ID
async function update(id, carParam) {
    const car = await Car.findOne({carID : id});
    // validate
    if (!car) throw 'Car not found';
    // copy carParam properties to user
    Object.assign(car, carParam);
    await car.save();
}

async function _delete(id) {
    await Car.deleteOne({username : id});
}