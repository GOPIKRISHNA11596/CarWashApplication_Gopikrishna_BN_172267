const express = require('express');
const router = express.Router();
const serviceRequest = require('../services/service-request.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/username/:id', getAllByUsername);
router.get('/bookingID/:id', getById);

router.put('/bookingID/:id', update);
router.put('/carID/:id', updateByCarID);

router.delete('/:id', _delete);

module.exports = router;

//Adding a car
function add(req, res, next) {
    const file = req.file;
    console.log(file);
    serviceRequest.create(req.body)
        .then(() => res.json('Service Request added Successfully'))
        .catch(err => next(err));
}

//Get all Cars
function getAll(req, res, next) {
    serviceRequest.getAll()
        .then(cars => res.json(cars))
        .catch(err => next(err));
}

function getAllByUsername(req, res, next) {
    serviceRequest.getAllByUsername(req.params.id)
        .then(cars => res.json(cars))
        .catch(err => next(err));
}

//Get car by ID
function getById(req, res, next) {
    serviceRequest.getById(req.params.id)
        .then(data => data ? res.json(data) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByUserName(req, res, next) {
    serviceRequest.getByUsername(req.params.id)
        .then(data => data ? res.json(data) : res.sendStatus(404))
        .catch(err => next(err));
}

//Update a car by ID
function update(req, res, next) {
    serviceRequest.update(req.params.id, req.body)
        .then(() => res.json('Service Request  details updated Successfully'))
        .catch(err => next(err));
}

//Update a car by ID
function updateByCarID(req, res, next) {
    serviceRequest.updateByCarID(req.params.id, req.body)
        .then(() => res.json('Service Request  details updated Successfully'))
        .catch(err => next(err));
}

//Delete a car by ID
function _delete(req, res, next) {
    serviceRequest.delete(req.params.id)
        .then(() => res.json('Removed Service Request Successfully'))
        .catch(err => next(err));
}