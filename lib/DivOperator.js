var Operator = require('./Operator');

function DivOperator(precedenceBoost) {
    this.precedence = 2 + (precedenceBoost || 0);
}

DivOperator.prototype = new Operator('/');

DivOperator.prototype.compute = function (left, right) {
    return left.value / right.value;
};

module.exports = DivOperator;