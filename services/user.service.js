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
    if(bcrypt.compareSync(password, user.hash)) {
        
        return user;
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

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    await user.save();
}

//To upadte a user
async function update(id, userParam) {
    const user = await User.findOne({username : id});

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

//To delete a user
async function _delete(id) {
    await User.deleteOne({username : id});
}