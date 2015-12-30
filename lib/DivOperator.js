var Operator = require('./Operator');

function DivOperator() {
}

DivOperator.prototype.compute = function (left, right) {
    return left.value / right.value;
};

module.exports = DivOperator;