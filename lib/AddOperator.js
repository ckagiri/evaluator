var Operator = require('./Operator');

function AddOperator() {
    this.precedence = 1;
}

AddOperator.prototype = new Operator('+');

AddOperator.prototype.compute = function (left, right) {
    return left.value + right.value;
};

module.exports = AddOperator;