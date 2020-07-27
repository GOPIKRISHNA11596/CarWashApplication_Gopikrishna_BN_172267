const db = require('../_helpers/db');
const CarWash = require('../models/carwashservices.model');

module.exports = {
    getAll,
    create,
    update,
    delete: _delete
};

//Add a car
async function create(carWashParam) {
    const carWash = new CarWash(carWashParam);
    await carWash.save();
}

//Get all cars
async function getAll() {
    return await CarWash.find();
}

//Uppdate a car by ID
async function update(id, carWashParam) {
    const carWash = await CarWash.findOne({carID : id});
    // validate
    if (!car) throw 'Car Service not found';
    // copy carParam properties to user
    Object.assign(carWash, carWashParam);
    await carWash.save();
}

async function _delete(id) {
    await CarWash.deleteOne({carID : id});
}