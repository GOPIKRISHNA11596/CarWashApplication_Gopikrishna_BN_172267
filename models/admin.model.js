const mongoose = require('mongoose');
var validate = require('mongoose-validator')

//Username Validator
var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Userame should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: false,
        message: 'Name should contain alpha-numeric characters only'
    })
]


const adminSchema = new mongoose.Schema({
    username: { type: String, 
                unique: true, 
                required: true, 
                trim: true, 
                lowercase: true,
                validate: usernameValidator 
            },
    hash: { type: String, 
            required: true, 
            trim: true 
        },
    createdDate: {  type: Date, 
                    default: Date.now
                },
    isActive: {type:Boolean} 
});

adminSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Admin', adminSchema, 'admins');