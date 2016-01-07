var Operator = require('./Operator');
var Big = require('big.js');

function AddOperator(precedenceBoost) {
    this.precedence = 1 + (precedenceBoost || 0);
}

AddOperator.prototype = new Operator('+');

AddOperator.prototype.compute = function (left, right) {
    var x = new Big(left.value);
    var y = new Big(right.value);
    var result = x.plus(y);
    return parseFloat(result);
};

module.exports = AddOperator;