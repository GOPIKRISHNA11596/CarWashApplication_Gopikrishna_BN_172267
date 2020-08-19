const mongoose = require('mongoose');
const Booking = require('../models/booking.model');

const serviceRequestSchema = new mongoose.Schema({
 
    username :{ type:String, required: true},
    bookingID : { type: Number, required: true},
    amount : { type: Number, required: true, trim: true },
    car : { type: String, required: true, trim: true },
    carID : { type: Number, required: true, trim: true },
    packageID : { type: Number, required: true, trim: true },
    packageName: { type: String, required: true, trim: true },
    date :  {type: Date},
    time :  {type: String, required:true, trim: true},

    // location: { type: String, required: true, trim: true }
    // location: { 
        doorNumber: { type: Number, required: true,trim: true},
        street: { type: String, required: true, trim: true },
        landmark: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        district: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        pincode: { type: Number, required: true, trim: true},
    //  }

    },
    {
        versionKey: false
    });
    serviceRequestSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const ServiceRequest = module.exports = mongoose.model('ServiceRequest', serviceRequestSchema, 'servicerequests');