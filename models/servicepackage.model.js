const mongoose = require('mongoose');

const carWashServiceSchema = new mongoose.Schema({
    packageID : { type: Number},
    packageName : { type: String, required: true },
    packageDescrpion :{ type: String, required: true},
    packageAmount : { type: String, required: true }
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