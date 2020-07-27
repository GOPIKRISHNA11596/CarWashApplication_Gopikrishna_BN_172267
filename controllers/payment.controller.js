const express = require('express');
const router = express.Router();
const paymentService = require('../services/payment.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

//Adding a payment details
function add(req, res, next) {
    paymentService.create(req.body)
        .then(() => res.json('Card added Successfully'))
        .catch(err => next(err));
}

//Get all payments
function getAll(req, res, next) {
    paymentService.getAll()
        .then(payment => res.json(payment))
        .catch(err => next(err));
}

//Get car by ID
function getById(req, res, next) {
    paymentService.getById(req.params.id)
        .then(payment => payment ? res.json(payment) : res.sendStatus(404))
        .catch(err => next(err));
}

//Update a car by ID
function update(req, res, next) {
    paymentService.update(req.params.id, req.body)
        .then(() => res.json('Updated card details Successfully'))
        .catch(err => next(err));
}

//Delete a car by ID
function _delete(req, res, next) {
    paymentService.delete(req.params.id)
        .then(() => res.json('Removed card details Successfully'))
        .catch(err => next(err));
}