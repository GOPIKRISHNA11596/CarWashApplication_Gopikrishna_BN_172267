const mongoose = require('mongoose');
var Schema = mongoose.Schema
const Car = require('../models/car.model');

const bookingSchema = new mongoose.Schema({
    bookingID : {type: Number, unique : true, trim: true},
    carInfo   : {
        type: Schema.Types.ObjectId,
        ref:'Car',
        trim: true
    },

    schedule  : {
        date :  {type: Date, default: Date.now},
        time :  {type: String, required:true, trim: true}
     },
    location  : {
        doorNumber : Number,
        street : String,
        landmark :String,
        city : String,
        district : String,
        state : String,
        pincode : Number,
    }
    //serviceDetails : {}
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