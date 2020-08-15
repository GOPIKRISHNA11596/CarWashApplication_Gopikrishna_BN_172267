const db = require('../_helpers/db');
const Payment = require('../models/payment.model');
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
async function create(paymentParam) {
    const payment = new Payment(paymentParam);

    var randomNumber= gen();//Generating Random number
    payment.tranactionID = randomNumber;

    await payment.save();
}

//Get all cars
async function getAll() {
    return await Payment.find();
}

//Get a car by ID
async function getById(id) {
    return await Payment.findOne({carID : id});
}

//Uppdate a car by ID
async function update(id, paymentParam) {
    const payment = await Payment.findOne({carID : id});
    // validate
    if (!payment) throw 'Card not found';
    // copy carParam properties to user
    Object.assign(payment, paymentParam);
    await payment.save();
}

async function _delete(id) {
    await Payment.deleteOne({carID : id});
}