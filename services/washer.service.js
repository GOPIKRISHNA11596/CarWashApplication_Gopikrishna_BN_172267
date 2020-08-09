const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Washer = require('../models/washer.model');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

//For login
async function authenticate({ username, password }) {
    const washer = await Washer.findOne({ username });
    console.log(washer);
    if(bcrypt.compareSync(password, washer.hash) ) {
        return true;
    }else{
        return false;
    }
}

//To get all users
async function getAll() {
    return await Washer.find();
}

//To get a user
async function getById(id) {
    return await Washer.findOne({username : id});
}

//To create a washer
async function create(washerParam) {
    // validate
    if (await Washer.findOne({ username: washerParam.username })) {
        throw 'Username "' + washerParam.username + '" is already taken';
    }
    const washer = new Washer(washerParam);

    //Comparing password and confirm password
    if(washerParam.password !== washerParam.confirmPassword){
        throw "Password and confirm password are not matching"
    }

    //Password Validation
    //var password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (!password_pattern.test(washerParam.password)) {
        throw "Password should between 8 to 15 characters and should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
    }else{
        //Hash password
        washer.hash = bcrypt.hashSync(washerParam.password, 10);
    }
    await washer.save();
}

//To upadte a user
async function update(id, washerParam) {
    const washer = await Washer.findOne({username : id});

    // validate
    if (!washer) throw 'User not found';
    if (washer.username !== washerParam.username && await User.findOne({ username: washerParam.username })) {
        throw 'Username "' + washerParam.username + '" is already taken';
    }
    //Comparing password and confirm password
    if(washerParam.password !== washerParam.confirmPassword){
        throw "Password and confirm password are not matching"
    }
    var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (!password_pattern.test(washerParam.password)) {
        throw "Password should between 8 to 15 characters and should contain at least one lowercase letter, one uppercase letter and one numeric digit."
    }else{
        //Hash password
        washer.hash = bcrypt.hashSync(washerParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(washer, washerParam);

    await washer.save();
}

//To delete a user
async function _delete(id) {
    await Washer.deleteOne({username : id});
}