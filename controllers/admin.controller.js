const express = require('express');
const router = express.Router();
const adminService = require('../services/admin.service');
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
    adminService.authenticate(req.body)
//    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .then(admin => admin ? res.json(admin) : res.json(admin))
    .catch(err => next(err));
}

function register(req, res, next) {
    adminService.create(req.body)
        .then(() => res.json('Registered Admin Successfully'))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    adminService.getAll()
        .then(admins => res.json(admins))
        .catch(err => next(err));
}

function getById(req, res, next) {
    adminService.getById(req.params.id)
        .then(admin => admin ? res.json(admin) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    adminService.update(req.params.id, req.body)
        .then(() => res.json('Updated Admin Successfully'))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    adminService.delete(req.params.id)
        .then(() => res.json('Deleted Admin Successfully'))
        .catch(err => next(err));
}