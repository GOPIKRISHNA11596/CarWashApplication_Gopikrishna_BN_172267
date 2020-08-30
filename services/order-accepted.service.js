const db = require('../_helpers/db');
const OrderAccepted = require('../models/order-accepted.model');


module.exports = {
    getAll,
    getById,
    create
};

//Add a car
async function create(OrderAcceptedParam) {
    const orderAccepted = new OrderAccepted(OrderAcceptedParam);
    await orderAccepted.save();
}

//Get all cars
async function getAll() {
    return await OrderAccepted.find();
}

//Get a car by username
async function getById(id) {
    return await OrderAccepted.findOne({bookingID : id});
}



