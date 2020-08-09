const express = require('express');
const router = express.Router();
const carWahService = require('../services/servicepackage.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

//Adding a car services
function add(req, res, next) {
    carWahService.create(req.body)
        .then(() => res.json('Car Services added Successfully'))
        .catch(err => next(err));
}

//Get all car services
function getAll(req, res, next) {
    carWahService.getAll()
        .then(cars => res.json(cars))
        .catch(err => next(err));
}
function getById(req, res, next) {
    carWahService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


//Update a car services
function update(req, res, next) {
    carWahService.update(req.params.id, req.body)
        .then(() => res.json('Car Services updated Successfully'))
        .catch(err => next(err));
}

//Delete a car services
function _delete(req, res, next) {
    carWahService.delete(req.params.id)
        .then(() => res.json('Car Services Removed Successfully'))
        .catch(err => next(err));
}