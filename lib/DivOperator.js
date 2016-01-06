var Operator = require('./Operator');

function DivOperator() {
    this.precedence = 2;
}

DivOperator.prototype = new Operator('/');

DivOperator.prototype.compute = function (left, right) {
    return left.value / right.value;
};

module.exports = DivOperator;