var Operator = require('./Operator');
var Operation = require('./Operation');
var Operand = require('./Operand');

function ElementList(elements) {
    this.elements = elements;
}

ElementList.prototype.findOperation = function () {
    var operators = this.elements.filter(function (n) {
        return n instanceof Operator;
    });
    if (!operators.length) return null;

    var maxPrecedence = Math.max.apply(Math, operators.map(function (n) {
        return n.precedence;
    }));
    var firstOp = operators.find(function (n) {
        return n.precedence === maxPrecedence;
    });

    var index = this.elements.indexOf(firstOp);
    return new Operation(
        this.getOperand([index - 1]),
        this.elements[index],
        this.getOperand([index + 1]));
};

ElementList.prototype.getOperand = function (index) {
    if (index >= 0 && index < this.elements.length && this.elements[index] instanceof Operand)
        return this.elements[index];
    return new Operand(0);
};

ElementList.prototype.replaceOperation = function (operation, operand) {
    var index = this.elements.indexOf(operation.op);
    if (this.getOperand(index + 1) == operation.rOperand)
        this.elements.splice(index + 1, 1);
    this.elements[index] = operand;
    if (this.getOperand(index - 1) == operation.lOperand)
        this.elements.splice(index - 1, 1);
};

ElementList.prototype.first = function () {
    return this.elements[0];
};

module.exports = ElementList;