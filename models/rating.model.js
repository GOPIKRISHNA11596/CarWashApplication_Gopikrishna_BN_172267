const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    username :{ type:String},
    rating : { type: Number},
    review : { type: String},
    bookingID : { type: Number}
    },
    {
        versionKey: false
    });

ratingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const Rating = module.exports = mongoose.model('Rating', ratingSchema, 'ratings');