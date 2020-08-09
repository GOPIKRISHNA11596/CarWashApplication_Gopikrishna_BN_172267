const mongoose = require('mongoose');

const carWashServiceSchema = new mongoose.Schema({
    packageID : { type: Number, trim: true},
    packageName : { type: String, required: true, trim: true },
    packageDescrpion :{ 
        service1 : String,
        service2 : String,
        service3 : String,
        service4 : String,
        service5 : String,
        service6 : String
    },
    packageAmount : { type: String, required: true, trim: true }
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