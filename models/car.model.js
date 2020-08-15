const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    username :{ type:String, required: true},
    carID : { type: Number}, //Random Car ID
    carBrand : { type: String, required: true, trim: true },
    carType : { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    color : { type: String, required: true, trim: true },
    carImage: { type: String}
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