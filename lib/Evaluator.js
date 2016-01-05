function Evaluator(parser) {
    this.parser = parser;
}

Evaluator.prototype.eval = function (s) {
    if (!s)
        throw new Error();
    var elements = this.parser.parse(s);
    if (elements.length == 3) {
        var op = elements[1];
        var left = elements[0];
        var right = elements[2];
        return op.compute(left, right);
    }
    return parseInt(s);
};

module.exports = Evaluator;