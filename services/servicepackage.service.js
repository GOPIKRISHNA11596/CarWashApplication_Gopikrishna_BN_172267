const db = require('../_helpers/db');
const CarWashService = require('../models/servicepackage.model');
var rn = require('random-number');

var gen = rn.generator({
    min:  1234567891,
    max:  9874316514,
    integer: true
  });

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

//Add a car
async function create(carWashServiceParam) {
    const carWashService = new CarWashService(carWashServiceParam);
    var randomNumber= gen();//Generating Random number
    carWashService.packageID = randomNumber;
    await carWashService.save();
}

//Get all cars
async function getAll() {
    return await CarWashService.find();
}

async function getById(id) {
    return await User.findOne({packageID : id});
}

//Uppdate a car by ID
async function update(id, carWashServiceParam) {
    const carWashService = await CarWashService.findOne({packageID : id});
    // validate
    if (!car) throw 'Car Service not found';
    // copy carParam properties to user
    Object.assign(carWash, carWashServiceParam);
    await carWashService.save();
}

async function _delete(id) {
    await CarWashService.deleteOne({packageID : id});
}