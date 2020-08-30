const db = require('../_helpers/db');
const Rating = require('../models/rating.model');


module.exports = {
    getAll,
    getById,
    create
};

//Add a car
async function create(ratingParam) {
    const rating = new Rating(ratingParam);
    await rating.save();
}

//Get all cars
async function getAll() {
    return await Rating.find();
}

//Get a car by username
async function getById(id) {
    return await Rating.findOne({bookingID : id});
}



