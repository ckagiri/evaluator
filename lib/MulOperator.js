var Operator = require('./Operator');

function MulOperator() {
}

MulOperator.prototype = new Operator('*');

MulOperator.prototype.compute = function (left, right) {
    return left.value * right.value;
};

module.exports = MulOperator;