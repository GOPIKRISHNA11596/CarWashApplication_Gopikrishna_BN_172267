const express = require('express');
const router = express.Router();
const carService = require('../services/car.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById); //username
router.get('/:id', getById1); //carID
router.get('/:id', getByIdCarBrand); //CarBrand
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

//Adding a car
function add(req, res, next) {
    const file = req.file;
    console.log(file);
    carService.create(req.body)
        .then(() => res.json('Added Car Successfully'))
        .catch(err => next(err));
}

//Get all Cars
function getAll(req, res, next) {
    carService.getAll()
        .then(cars => res.json(cars))
        .catch(err => next(err));
}

//Get car by ID
function getById(req, res, next) {
    carService.getById(req.params.id)
        .then(car => car ? res.json(car) : res.sendStatus(404))
        .catch(err => next(err));
}

//Get car by ID
function getById1(req, res, next) {
    carService.getById1(req.params.id)
        .then(car => car ? res.json(car) : res.sendStatus(404))
        .catch(err => next(err));
}

//Get car by ID
function getByIdCarBrand(req, res, next) {
    carService.getByIdCarBrand(req.params.id)
        .then(car => car ? res.json(car) : res.sendStatus(404))
        .catch(err => next(err));
}

//Update a car by ID
function update(req, res, next) {
    carService.update(req.params.id, req.body)
        .then(() => res.json('Updated car details Successfully'))
        .catch(err => next(err));
}

//Delete a car by ID
function _delete(req, res, next) {
    carService.delete(req.params.id)
        .then(() => res.json('Removed car Successfully'))
        .catch(err => next(err));
}