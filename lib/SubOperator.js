var Operator = require('./Operator');
var Big = require('big.js');

function SubOperator(precedenceBoost) {
    this.precedence = 1 + (precedenceBoost || 0);
}

SubOperator.prototype = new Operator('-');

SubOperator.prototype.compute = function (left, right) {
    var x = new Big(left.value);
    var y = new Big(right.value);
    var result = x.minus(y);
    return parseFloat(result);
};

module.exports = SubOperator;