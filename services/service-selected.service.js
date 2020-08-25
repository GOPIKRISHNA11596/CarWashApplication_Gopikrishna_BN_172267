const db = require('../_helpers/db');
const ServiceSelected = require('../models/service-selected');


module.exports = {
    create,
    getAll,
    getById,
    getServiceByCarId,
    update,
    delete: _delete
};

async function create(serviceSelectedParam) {
    const serviceSelected = new ServiceSelected(serviceSelectedParam);
    await serviceSelected.save();
}


//Get all bookings
async function getAll() {
    return await ServiceSelected.find();
}

//Get a booking by ID
async function getById(id) {
    return await ServiceSelected.findOne({username : id});
}

async function getServiceByCarId(id) {
    return await ServiceSelected.findOne({carID : id});
}

//Update a booking by ID
async function update(id, serviceSelectedParam) {
    const serviceSelected = await ServiceSelected.findOne({carID : id});
    // validate
    // copy carParam properties to user
    console.log(serviceSelectedParam);
    Object.assign(serviceSelected, serviceSelectedParam);
    await serviceSelected.save();
}

//Delete booking by id
async function _delete(id) {
    await ServiceSelected.deleteOne({username : id});
}

