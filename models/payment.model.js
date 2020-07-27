const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userName : { type: String,  required: true }, 
    cardHolderName : { type: String, required: true },
    cardNumber : { type: String, required: true },
    expmon: { type: String, required: true },
    expyear : { type: String, required: true },
    cvv : {type: String, required: true },
    amount : { type: String, required: true }
    },
    {
        versionKey: false
    });

paymentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const Payment = module.exports = mongoose.model('Payment', paymentSchema, 'payments');