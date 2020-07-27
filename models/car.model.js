const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
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

carSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const Car = module.exports = mongoose.model('Car', carSchema, 'cars');