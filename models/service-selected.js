const mongoose = require('mongoose');

const serviceSelected = new mongoose.Schema({
    username :{ type:String, trim: true},
    packageID : { type: Number, trim: true},
    carID : { type: Number, trim: true}
    },
    {
        versionKey: false
    });
    serviceSelected.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const ServiceSelected = module.exports = mongoose.model('ServiceSelected', serviceSelected, 'serviceselected');