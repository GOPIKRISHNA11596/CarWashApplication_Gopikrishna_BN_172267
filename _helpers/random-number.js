var rn = require('random-number');

module.exports = randomNumber;

function randomNumber(req, res) {
var gen = rn.generator({
    min:  1234567891,
    max:  9874316514,
    integer: true
  });
} 