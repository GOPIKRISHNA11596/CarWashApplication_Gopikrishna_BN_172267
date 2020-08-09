const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    username : { type: String,  required: true, trim: true }, 
    cardHolderName : { type: String, required: true, trim: true },
    cardNumber : { type: String, required: true, trim: true },
    expmon: { type: String, required: true, trim: true },
    expyear : { type: String, required: true, trim: true },
    cvv : {type: String, required: true, trim: true },
    amount : { type: String, required: true, trim: true }
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