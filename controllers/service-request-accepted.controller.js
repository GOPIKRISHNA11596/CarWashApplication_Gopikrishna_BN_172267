const express = require('express');
const router = express.Router();
const serviceRequestAccepted = require('../services/service-request-accepted.service');

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
    serviceRequestAccepted.create(req.body)
        .then(() => res.json('Service Request Accept added Successfully'))
        .catch(err => next(err));
}

//Get all Cars
function getAll(req, res, next) {
    serviceRequestAccepted.getAll()
        .then(data => res.json(data))
        .catch(err => next(err));
}

//Get car by ID
function getById(req, res, next) {
    serviceRequestAccepted.getById(req.params.id)
        .then(data => data ? res.json(data) : res.sendStatus(404))
        .catch(err => next(err));
}

//Update a car by ID
function update(req, res, next) {
    serviceRequestAccepted.update(req.params.id, req.body)
        .then(() => res.json('Service Request Accept updated Successfully'))
        .catch(err => next(err));
}

//Delete a car by ID
function _delete(req, res, next) {
    serviceRequestAccepted.delete(req.params.id)
        .then(() => res.json('Removed Service Request accept Successfully'))
        .catch(err => next(err));
}