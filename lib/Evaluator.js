var Operator = require('./Operator');
var Operand = require('./Operand');
var Operation = require('./Operation');
var ElementList = require('./ElementList');

function Evaluator(parser) {
    this.parser = parser;
}

Evaluator.prototype.eval = function (s) {
    if (!s)
        throw new Error();
    var elements = new ElementList(this.parser.parse(s));
    var operation = elements.findOperation();
    while (operation !== null) {
        var newElement = operation.compute();
        elements.replaceOperation(operation, newElement);
        operation = elements.findOperation();
    }
    return elements.first().value;
};

module.exports = Evaluator;