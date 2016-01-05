var Operator = require('./Operator');
var Operand = require('./Operand');

function Evaluator(parser) {
    this.parser = parser;
}

Evaluator.prototype.eval = function (s) {
    if (!s)
        throw new Error();
    var elements = this.parser.parse(s);
    while (elements.length > 1) {
        var tuple = findOperation(elements);
        var newElement = compute(tuple.operation);
        replaceOperation(elements, tuple.index, newElement);
    }
    return elements[0].value;
};

function findOperation(elements) {
    for (var i = 0; i < elements.length; i++)
        if (elements[i] instanceof Operator)
            return {
                index: i - 1,
                operation: new Operation(elements[i - 1], elements[i], elements[i + 1])
            };
    return null;
}

function compute(operation) {
    return new Operand(operation.op.compute(operation.lOperand, operation.rOperand));
}

function replaceOperation(elements, index, operand) {
    elements.splice(index + 2, 1);
    elements.splice(index + 1, 1);
    elements.splice(index, 1);

    elements.splice(index, 0, operand);
}

function Operation(lOperand, op, rOperand) {
    this.lOperand = lOperand;
    this.op = op;
    this.rOperand = rOperand;
}

module.exports = Evaluator;