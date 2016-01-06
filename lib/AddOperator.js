var Operator = require('./Operator');

function AddOperator(precedenceBoost) {
    this.precedence = 1 + (precedenceBoost || 0);
}

AddOperator.prototype = new Operator('+');

AddOperator.prototype.compute = function (left, right) {
    return left.value + right.value;
};

module.exports = AddOperator;