const express = require('express');
const router = express.Router();
const orderAcceptedService = require('../services/order-accepted.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);


module.exports = router;

//Adding a car
function add(req, res, next) {
    const file = req.file;
    console.log(file);
    orderAcceptedService.create(req.body)
        .then(() => res.json('Order Accepted Successfully'))
        .catch(err => next(err));
}

//Get all Cars
function getAll(req, res, next) {
    orderAcceptedService.getAll()
        .then(rating => res.json(rating))
        .catch(err => next(err));
}

//Get car by ID
function getById(req, res, next) {
    orderAcceptedService.getById(req.params.id)
        .then(rating => rating ? res.json(rating) : res.sendStatus(404))
        .catch(err => next(err));
}


