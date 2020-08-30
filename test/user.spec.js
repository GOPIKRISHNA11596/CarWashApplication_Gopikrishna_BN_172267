const {} = require('../controllers/user.controller');
const assert = require('assert');
var expect    = require("chai").expect;

describe('The findByUsename function', () => {
    it('Finds a user by username', () => {
        const actual = getById('gopibn')
        const expected = {
            message: 'User found Successfully'
        }
        assert.equal(actual, expected);
    })
})