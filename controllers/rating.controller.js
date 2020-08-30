const express = require('express');
const router = express.Router();
const ratingService = require('../services/rating.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getById); //username


module.exports = router;

//Adding a car
function add(req, res, next) {
    const file = req.file;
    console.log(file);
    ratingService.create(req.body)
        .then(() => res.json('Added Rating Successfully'))
        .catch(err => next(err));
}

//Get all Cars
function getAll(req, res, next) {
    ratingService.getAll()
        .then(rating => res.json(rating))
        .catch(err => next(err));
}

//Get car by ID
function getById(req, res, next) {
    ratingService.getById(req.params.id)
        .then(rating => rating ? res.json(rating) : res.sendStatus(404))
        .catch(err => next(err));
}


