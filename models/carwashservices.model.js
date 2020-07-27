const mongoose = require('mongoose');

const carWashSchema = new mongoose.Schema({
    carID : { type: Number}, //Random Service Number
    carBrand : { type: String, required: true },
    carType : { type: String, required: true },
    year: { type: Number, required: true },
    color : { type: String, required: true },
    image : { type: String, required: true }
    },
    {
        versionKey: false
    });

carWashSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const CarWash = module.exports = mongoose.model('CarWash', carWashSchema, 'carwashs');