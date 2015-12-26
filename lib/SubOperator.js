var Operator = require('./Operator');

function SubOperator() {
}
SubOperator.prototype = new Operator('-');

SubOperator.prototype.compute = function (left, right) {
    return left.value - right.value;
};

module.exports = SubOperator;