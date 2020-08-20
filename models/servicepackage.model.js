const mongoose = require('mongoose');

const carWashServiceSchema = new mongoose.Schema({
    username: { type: String, 
        unique: true, 
        trim: true, 
        lowercase: true 
    },
    packageID : { type: Number, trim: true},
    packageName : { type: String, required: true, trim: true },
        service1 : { type: String, required: true, trim: true },
        service2 : { type: String, required: true, trim: true },
        service3 : { type: String, required: true, trim: true },
        service4 : { type: String, required: true, trim: true },
        service5 : { type: String, required: true, trim: true },
        service6 : { type: String, required: true, trim: true },
    packageAmount : { type: Number, required: true, trim: true }
    },
    {
        versionKey: false
    });

carWashServiceSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const CarWashService = module.exports = mongoose.model('CarWashService', carWashServiceSchema, 'carwashservices');