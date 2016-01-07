var Operator = require('./Operator');
var Big = require('big.js');

function MulOperator(precedenceBoost) {
    this.precedence = 2 + (precedenceBoost || 0);
}

MulOperator.prototype = new Operator('*');

MulOperator.prototype.compute = function (left, right) {
    var x = new Big(left.value);
    var y = new Big(right.value);
    var result = x.times(y);
    return parseFloat(result);
};

module.exports = MulOperator;