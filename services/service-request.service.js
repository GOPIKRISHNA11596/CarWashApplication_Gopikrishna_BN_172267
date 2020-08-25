const db = require('../_helpers/db');
const ServiceRequest = require('../models/service-request.model');

module.exports = {
    create,
    getAll,
    getAllByUsername,
    getById,
    getByUsername,
    update,
    updateByCarID,
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

async function getAllByUsername(username) {
    return await ServiceRequest.find({username  : username});
}

//Get a booking by ID
async function getById(id) {
    return await ServiceRequest.findOne({bookingID : id});
}

//Get a booking by Username
async function getByUsername(username) {
    return await ServiceRequest.findOne({username  : username});
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

// //Update a booking by ID
// async function updateByCarID(carID, serviceRequestParam) {
//     const serviceRequest = await ServiceRequest.findOne({carID : carID});
//     // validate
//     if (!serviceRequest) throw 'Car not found';
//     // copy carParam properties to user
//     Object.assign(serviceRequest, serviceRequestParam);
//     await serviceRequest.save();
// }


async function updateByCarID(id, Param) {
    //console.log('carID ' + carID);
    console.log('serviceRequestParam' + Param);
    const serviceRequest = await ServiceRequest.findOne({carID : id});
    console.log('Find One : ' + serviceRequest);
    // validate
    if (!serviceRequest) throw 'Car not found';
    // copy carParam properties to user
    Object.assign(serviceRequest, Param);
    await serviceRequest.save();
}

//Delete booking by id
async function _delete(id) {
    await ServiceRequest.deleteOne({bookingID : id});
}