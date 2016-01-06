var Operator = require('./Operator');

function SubOperator(precedenceBoost) {
    this.precedence = 1 + (precedenceBoost || 0);
}

SubOperator.prototype = new Operator('-');

SubOperator.prototype.compute = function (left, right) {
    return left.value - right.value;
};

module.exports = SubOperator;