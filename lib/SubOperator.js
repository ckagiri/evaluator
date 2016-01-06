var Operator = require('./Operator');

function SubOperator() {
    this.precedence = 1;
}

SubOperator.prototype = new Operator('-');

SubOperator.prototype.compute = function (left, right) {
    return left.value - right.value;
};

module.exports = SubOperator;