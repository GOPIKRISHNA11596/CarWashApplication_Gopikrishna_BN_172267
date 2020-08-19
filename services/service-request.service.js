const db = require('../_helpers/db');
const ServiceRequest = require('../models/service-request.model');

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(serviceRequestParam) {
    const serviceRequest = new ServiceRequest(serviceRequestParam);
    await serviceRequest.save();
}


//Get all bookings
async function getAll() {
    return await ServiceRequest.find();
}

//Get a booking by ID
async function getById(id) {
    return await ServiceRequest.findOne({bookingID : id});
}

//Update a booking by ID
async function update(id, serviceRequestParam) {
    const serviceRequest = await ServiceRequest.findOne({bookingID : id});
    // validate
    if (!serviceRequest) throw 'Car not found';
    // copy carParam properties to user
    Object.assign(serviceRequest, serviceRequestParam);
    await serviceRequest.save();
}

//Delete booking by id
async function _delete(id) {
    await ServiceRequest.deleteOne({bookingID : id});
}