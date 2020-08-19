const db = require('../_helpers/db');
const ServiceRequestAcceptedModel = require('../models/service-request-accepted.model');

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(serviceRequestAcceptedParam) {
    const serviceRequestAccepted = new ServiceRequestAcceptedModel(serviceRequestAcceptedParam);
    await serviceRequestAccepted.save();
}


//Get all bookings
async function getAll() {
    return await ServiceRequestAcceptedModel.find();
}

//Get a booking by ID
async function getById(id) {
    return await ServiceRequestAcceptedModel.findOne({bookingID : id});
}

//Update a booking by ID
async function update(id, serviceRequestAcceptedParam) {
    const serviceRequestAccepted = await ServiceRequestAcceptedModel.findOne({bookingID : id});
    // copy carParam properties to user
    Object.assign(serviceRequestAccepted, serviceRequestAcceptedParam);
    await serviceRequestAccepted.save();
}

//Delete booking by id
async function _delete(id) {
    await ServiceRequestAcceptedModel.deleteOne({bookingID : id});
}