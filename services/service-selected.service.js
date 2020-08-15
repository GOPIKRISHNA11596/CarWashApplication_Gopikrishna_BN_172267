const db = require('../_helpers/db');
const ServiceSelected = require('../models/service-selected');


module.exports = {
    create,
    getAll,
    getById,
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

//Update a booking by ID
async function update(id, serviceSelectedParam) {
    const serviceSelected = await ServiceSelected.findOne({username : id});
    // validate
    if (!serviceSelected) throw 'Not found';
    // copy carParam properties to user
    Object.assign(serviceSelected, serviceSelectedParam);
    await serviceSelected.save();
}

//Delete booking by id
async function _delete(id) {
    await ServiceSelected.deleteOne({username : id});
}

