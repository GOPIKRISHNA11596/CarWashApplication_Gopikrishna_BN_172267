const express = require('express');
const router = express.Router();
const waherService = require('../services/washer.service');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);


module.exports = router;

function authenticate(req, res, next) {
    waherService.authenticate(req.body)
    .then(washer => washer ? res.json(washer) : res.json(washer))
    .catch(err => next(err));
}

function register(req, res, next) {
    waherService.create(req.body)
        .then(() => res.json('Registered Successfully'))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    waherService.getAll()
        .then(washers => res.json(washers))
        .catch(err => next(err));
}

function getById(req, res, next) {
    waherService.getById(req.params.id)
        .then(washer => washer ? res.json(washer) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    waherService.update(req.params.id, req.body)
        .then(() => res.json('Updated Successfully'))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    waherService.delete(req.params.id)
        .then(() => res.json('Deleted Successfully'))
        .catch(err => next(err));
}