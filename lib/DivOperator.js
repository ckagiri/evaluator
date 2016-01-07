var Operator = require('./Operator');
var Big = require('big.js');

function DivOperator(precedenceBoost) {
    this.precedence = 2 + (precedenceBoost || 0);
}

DivOperator.prototype = new Operator('/');

DivOperator.prototype.compute = function (left, right) {
    var x = new Big(left.value);
    var y = new Big(right.value);
    var result = x.div(y);
    return parseFloat(result);
};

module.exports = DivOperator;