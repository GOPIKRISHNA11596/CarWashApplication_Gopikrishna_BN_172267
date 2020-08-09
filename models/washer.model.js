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
        arguments: [3, 20],
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
            return /^((\\+91-?)|0)?[0-9]{10}$/.test(v);
        },
        message: '{VALUE} is not a valid 10 digit number!'
    }),

]

const washerSchema = new mongoose.Schema({
    Name: { type: String, 
                 required: true,
                 trim: true 
                },
    username: { type: String, 
                 unique: true, 
                 required: true, 
                 trim: true, 
                 lowercase: true,
                 validate: usernameValidator 
                },             
    email:{ type: String, 
                 unique: true, 
                 trim: true,
                 lowercase: true,
                 required: 'Email address is required',
                 validate: [validateEmail, 'Please fill a valid email address'],
                 match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                },           
    company: { type: String, 
                required: true,
                trim: true },
    contactNo:{ type: Number,
                required: true, 
                trim: true, 
                validate: contactnoValidator
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

washerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Washer', washerSchema, 'washers');