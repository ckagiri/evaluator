var Operator = require('./Operator');

function MulOperator(precedenceBoost) {
    this.precedence = 2 + (precedenceBoost || 0);
}

MulOperator.prototype = new Operator('*');

MulOperator.prototype.compute = function (left, right) {
    return left.value * right.value;
};

module.exports = MulOperator;