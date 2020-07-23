const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    serviceID : { type: Number}, //Random Service Number
    //serviceID : { type: Number, default : gen(), unique: true}, //Random Service Number
    carBrand : { type: String, required: true },
    carType : { type: String, required: true },
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

module.exports = mongoose.model('Car', carSchema);