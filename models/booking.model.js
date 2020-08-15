const mongoose = require('mongoose');
var Schema = mongoose.Schema
const Car = require('../models/car.model');

const bookingSchema = new mongoose.Schema({
    username: { type: String, 
        unique: true, 
        required: true, 
        trim: true, 
        lowercase: true 
    },
    bookingID : {type: Number, unique : true, trim: true},
    date :  {type: Date, default: Date.now},
    time :  {type: String, required:true, trim: true},
    doorNumber : {type: Number, required:true, trim: true},
    street : {type: String, required:true, trim: true},
    landmark : {type: String, required:true, trim: true},
    city : {type: String, required:true, trim: true},
    district : {type: String, required:true, trim: true},
    state : {type: String, required:true, trim: true},
    pincode : {type: Number, required:true, trim: true}

},
{
    versionKey: false
});

 bookingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const Booking = module.exports = mongoose.model('Booking', bookingSchema, 'bookings');