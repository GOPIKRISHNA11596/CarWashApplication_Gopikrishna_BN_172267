const mongoose = require('mongoose');
var validate = require('mongoose-validator')

//Email Validator
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//Username Validator
var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Userame should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: false,
        message: 'Name should contain alpha-numeric characters only'
    })
]

//Contact Number Validator
var contactnoValidator = [
    validate({
        validator: function(v) {
            return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(v);
        },
        message: '{VALUE} is not a valid 10 digit number!'
    }),

]

const userSchema = new mongoose.Schema({
    firstName: { type: String, 
                 required: true,
                 trim: true 
                },
    lastName: { type: String, 
                required: true,
                trim: true },
    email:{ type: String, 
            unique: true, 
            trim: true,
            lowercase: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },

    contactNo:{ type: Number,
                required: true, 
                trim: true, 
                validate: contactnoValidator
            },

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

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', userSchema, 'users');