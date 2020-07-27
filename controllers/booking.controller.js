const express = require('express');
const router = express.Router();
const bookingService = require('../services/booking.service');

// routes
router.post('/add', Create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


//Scheduling the car
function Create(req, res, next) {
    bookingService.create(req.body)
        .then(() => res.json('Scheduled Successfully'))
        .catch(err => next(err));
}

//Get all schedules
function getAll(req, res, next) {
    bookingService.getAll()
        .then(bookings => res.json(bookings))
        .catch(err => next(err));
}

//Get car by ID
function getById(req, res, next) {
    bookingService.getById(req.params.id)
        .then(bookings => bookings ? res.json(bookings) : res.sendStatus(404))
        .catch(err => next(err));
}

//Update a car by ID
function update(req, res, next) {
    bookingService.update(req.params.id, req.body)
        .then(() => res.json('scheduling Updated successfully'))
        .catch(err => next(err));
}

//Delete a car by ID
function _delete(req, res, next) {
    bookingService.delete(req.params.id)
        .then(() => res.json('scheduling Removed Successfully'))
        .catch(err => next(err));
}
