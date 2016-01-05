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
        var tupleIndex = findOperation(elements);
        var newElement = compute(elements[tupleIndex], elements[tupleIndex + 1], elements[tupleIndex + 2]);
        replaceOperation(elements, tupleIndex, newElement);
    }
    return elements[0].value;
};

function findOperation(elements) {
    for (var i = 0; i < elements.length; i++)
        if (elements[i] instanceof Operator)
            return i - 1;
    return 0;
}

function compute(lOperand, op, rOperand) {
    return new Operand(op.compute(lOperand, rOperand));
}

function replaceOperation(elements, index, operand) {
    elements.splice(index + 2, 1);
    elements.splice(index + 1, 1);
    elements.splice(index, 1);
    
    elements.splice(index, 0, operand);
}

module.exports = Evaluator;