const mongoose = require('mongoose');

const orderAcceptedSchema = new mongoose.Schema({
    username :{ type:String},
    isAccepted : { type: Boolean},
    bookingID : { type: Number}
    },
    {
        versionKey: false
    });

    orderAcceptedSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const Rating = module.exports = mongoose.model('OrderAccepted', orderAcceptedSchema, 'OrderAccepted');