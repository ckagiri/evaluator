var Operator = require('./Operator');
var Operation = require('./Operation');

function ElementList(elements) {
    this.elements = elements;
}

ElementList.prototype.findOperation = function () {
    var operators = this.elements.filter(function (n) {
        return n instanceof Operator;
    });
    if(!operators.length) return null;
    
    var maxPrecedence = Math.max.apply(Math, operators.map(function (n) {
        return n.precedence;
    }));
    var firstOp = operators.find(function (n) {
        return n.precedence === maxPrecedence;
    });

    var index = this.elements.indexOf(firstOp);
    return new Operation(
        this.elements[index - 1],
        this.elements[index],
        this.elements[index + 1]);
};

ElementList.prototype.replaceOperation = function (operation, operand) {
    var index = this.elements.indexOf(operation.lOperand);

    this.elements.splice(index + 2, 1);
    this.elements.splice(index + 1, 1);
    this.elements[index] = operand;
};

ElementList.prototype.first = function () {
    return this.elements[0];
};

module.exports = ElementList;