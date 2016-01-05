var Parser = require('./Parser');
var OperatorFactory = require('./OperatorFactory');
var OperandFactory = require('./OperandFactory');

function Evaluator() {
}

Evaluator.prototype.eval = function (s) {
    if (!s)
        throw new Error();
    var parser = new Parser(new OperatorFactory(), new OperandFactory());
    var elements = parser.parse(s);
    if (elements.length == 3) {
        var op = elements[1];
        var left = elements[0];
        var right = elements[2];
        return op.compute(left, right);
    }
    return parseInt(s);
};

module.exports = Evaluator;