const express = require('express');
const router = express.Router();
const ServiceSelectedService = require('../services/service-selected.service');

// routes
router.post('/add', Create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


//Scheduling the car
function Create(req, res, next) {
    ServiceSelectedService.create(req.body)
        .then(() => res.json('Service Selected Successfully'))
        .catch(err => next(err));
}

//Get all schedules
function getAll(req, res, next) {
    ServiceSelectedService.getAll()
        .then(bookings => res.json(bookings))
        .catch(err => next(err));
}

//Get car by ID
function getById(req, res, next) {
    ServiceSelectedService.getById(req.params.id)
        .then(bookings => bookings ? res.json(bookings) : res.sendStatus(404))
        .catch(err => next(err));
}

//Update a car by ID
function update(req, res, next) {
    ServiceSelectedService.update(req.params.id, req.body)
        .then(() => res.json('Service Updated successfully'))
        .catch(err => next(err));
}

//Delete a car by ID
function _delete(req, res, next) {
    ServiceSelectedService.delete(req.params.id)
        .then(() => res.json('Service Removed Successfully'))
        .catch(err => next(err));
}
