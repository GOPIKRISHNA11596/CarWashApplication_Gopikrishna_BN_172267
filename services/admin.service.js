const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Admin = require('../models/admin.model');

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
    const admin = await Admin.findOne({ username });
    if(bcrypt.compareSync(password, admin.hash) ) {
        return true;
    }else{
        return false;
    }
}

//To get all users
async function getAll() {
    return await Admin.find();
}

//To get a user
async function getById(id) {
    return await Admin.findOne({username : id});
}

//To create a user
async function create(adminParam) {
    // validate
    if (await Admin.findOne({ username: adminParam.username })) {
        throw 'Username "' + adminParam.username + '" is already taken';
    }
    const admin = new Admin(adminParam);

    //Comparing password and confirm password
    if(adminParam.password !== adminParam.confirmPassword){
        throw "Password and confirm password are not matching"
    }

    //Password Validation
    //var password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (!password_pattern.test(adminParam.password)) {
        throw "Password should between 8 to 15 characters and should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
    }else{
        //Hash password
        admin.hash = bcrypt.hashSync(adminParam.password, 10);
    }
    await admin.save();
}

//To upadte a user
async function update(id, adminParam) {
    const admin = await Admin.findOne({username : id});

    // validate
    if (!admin) throw 'User not found';
    if (admin.username !== adminParam.username && await Admin.findOne({ username: adminParam.username })) {
        throw 'Username "' + adminParam.username + '" is already taken';
    }
    //Comparing password and confirm password
    if(adminParam.password !== adminParam.confirmPassword){
        throw "Password and confirm password are not matching"
    }
    var password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (!password_pattern.test(adminParam.password)) {
        throw "Password should between 8 to 15 characters and should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
    }else{
        //Hash password
        admin.hash = bcrypt.hashSync(adminParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(admin, adminParam);

    await admin.save();
}

//To delete a user
async function _delete(id) {
    await Admin.deleteOne({username : id});
}