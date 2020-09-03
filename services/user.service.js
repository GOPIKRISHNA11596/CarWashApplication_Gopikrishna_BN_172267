const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = require('../models/user.model');

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
    const user = await User.findOne({ username });
    if(bcrypt.compareSync(password, user.hash) ) {
        return true;
    }else{
        return false;
    }
}

//To get all users
async function getAll() {
    return await User.find();
}

//To get a user
async function getById(id) {
    return await User.findOne({username : id});
}

//To create a user
async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    const user = new User(userParam);

    //Comparing password and confirm password
    if(userParam.password !== userParam.confirmPassword){
        throw "Password and confirm password are not matching"
    }

    //Password Validation
    //var password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (!password_pattern.test(userParam.password)) {
        throw "Password should between 8 to 15 characters and should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
    }else{
        //Hash password
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    return await user.save();
}

//To upadte a user
async function update(id, userParam) {
    const user = await User.findOne({username : id});

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    //Comparing password and confirm password
    if(userParam.password !== userParam.confirmPassword){
        throw "Password and confirm password are not matching"
    }
    var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (!password_pattern.test(userParam.password)) {
        throw "Password should between 8 to 15 characters and should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
    }else{
        //Hash password
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    return await user.save();
}

//To delete a user
async function _delete(id) {
    await User.deleteOne({username : id});
}