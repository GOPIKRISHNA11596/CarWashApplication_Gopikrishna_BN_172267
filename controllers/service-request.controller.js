const express = require('express');
const router = express.Router();
const serviceRequest = require('../services/service-request.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
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

//Get car by ID
function getById(req, res, next) {
    serviceRequest.getById(req.params.id)
        .then(car => car ? res.json(car) : res.sendStatus(404))
        .catch(err => next(err));
}

//Update a car by ID
function update(req, res, next) {
    serviceRequest.update(req.params.id, req.body)
        .then(() => res.json('Service Request details Successfully'))
        .catch(err => next(err));
}

//Delete a car by ID
function _delete(req, res, next) {
    serviceRequest.delete(req.params.id)
        .then(() => res.json('Removed Service Request Successfully'))
        .catch(err => next(err));
}