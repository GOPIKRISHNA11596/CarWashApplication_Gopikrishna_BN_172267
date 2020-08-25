const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
 
    username :{ type:String},
    bookingID : { type: Number, required: true},
    amount : { type: Number, trim: true },
    carBrand : { type: String,trim: true },
    carID : { type: Number, trim: true },
    packageID : { type: Number, trim: true },
    packageName: { type: String, trim: true },
    date :  {type: Date},
    time :  {type: String, trim: true},

    // location: { type: String, required: true, trim: true }
    // location: { 
        doorNumber: { type: Number, trim: true},
        street: { type: String,  trim: true },
        landmark: { type: String,  trim: true },
        city: { type: String,  trim: true },
        district: { type: String, trim: true },
        state: { type: String, trim: true },
        pincode: { type: Number, trim: true},
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