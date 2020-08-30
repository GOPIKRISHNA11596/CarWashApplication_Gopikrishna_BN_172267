const db = require('../_helpers/db');
const Booking = require('../models/booking.model');
var rn = require('random-number');

var gen = rn.generator({
    min:  1234567891,
    max:  9874316514,
    integer: true
  });

module.exports = {
    create,
    getAll,
    getById,
    getAllScheduleByUsername,
    update,
    delete: _delete
};

async function create(bookingParam) {
    const booking = new Booking(bookingParam);

    var randomNumber= gen();//Generating Random number
    booking.bookingID = randomNumber;
    await booking.save();
}


//Get all bookings
async function getAll() {
    return await Booking.find();
}

//Get a booking by ID
async function getById(id) {
    return await Booking.findOne({username : id});
}

async function getAllScheduleByUsername(username) {
    return await Booking.find({username  : username});
}

//Update a booking by ID
async function update(id, bookingParam) {
    const booking = await Booking.findOne({username : id});
    // validate
    if (!booking) throw 'Car not found';
    // copy carParam properties to user
    Object.assign(booking, bookingParam);
    await booking.save();
}

//Delete booking by id
async function _delete(id) {
    await Booking.deleteOne({username : id});
}

