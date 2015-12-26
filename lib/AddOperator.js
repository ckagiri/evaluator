var Operator = require('./Operator');

function AddOperator() {
}

AddOperator.prototype = new Operator('+');

AddOperator.prototype.compute = function (left, right) {
    return left.value + right.value;
};

module.exports = AddOperator;