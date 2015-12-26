var assert = require('assert');

function Evaluator() {
}

Evaluator.prototype.eval = function (s) {
    if (!s)
        throw new Error();
    var parser = new Parser();
    var elements = parser.parse(s);
    if (elements.length == 3) {
        var op = elements[1];
        var left = elements[0];
        var right = elements[2];
        return op.compute(left, right);
    }
    return parseInt(s);
};

function Parser() {
}

Parser.prototype.parse = function (s) {
    var tokens = [],
        elements = [],
        currentWord = [],
        char,
        kind,
        lastKind, token,
        i, ii;
    var operatorFactor = new OperatorFactory();
    for (i = 0; i < s.length; i++) {
        char = s[i];
        kind = kindOf(char);
        if (kind !== lastKind) {
            if (currentWord.length > 0) {
                tokens.push(currentWord.join(''));
                currentWord = [];
            }
        }
        switch (kind) {
            case 'numeric':
                currentWord.push(char);
                break;
            default:
                tokens.push(char);
                break;
        }
        lastKind = kind;
    }
    if (currentWord.length > 0) {
        tokens.push(currentWord.join(''));
    }
    lastKind = null;
    for (ii = 0; ii < tokens.length; ii++) {
        token = tokens[ii];
        kind = kindOf(token);
        switch (kind) {
            case 'numeric':
                elements.push(new Operand(token));
                break;
            default:
                elements.push(operatorFactor.create(token));
        }
        lastKind = kind;
    }
    return elements;
    function kindOf(word) {
        if (/[0-9]/g.test(word)) {
            return 'numeric';
        } else {
            return 'operator';
        }
    }
};

function Element() { }

function Operand(val) {
    this.value = parseInt(val);
}

Operand.prototype = new Element();

function Operator(val) {
    this.value = val;
}

Operator.prototype = new Element();

Operator.prototype.compute = function (left, right) {
    switch (this.value) {
        case '+':
            return left.value + right.value;
        case '-':
            return left.value - right.value;
        default:
            throw new Error();
    }
};

function AddOperator() {
}
AddOperator.prototype = new Operator('+');
AddOperator.prototype.compute = function (left, right) {
    return left.value + right.value;
};

function SubOperator() {
}
SubOperator.prototype = new Operator('-');
SubOperator.prototype.compute = function (left, right) {
    return left.value - right.value;
};

function OperatorFactory() { }

OperatorFactory.prototype.create = function (op) {
    switch (op) {
        case '+':
            return new AddOperator();
        case '-':
            return new SubOperator();
        default:
            throw new Error();
    }
};

describe('Evaluator', function () {
    it('can add two integer numbers', function () {
        var sut = new Evaluator();
        var result = sut.eval('10+25');
        assert.equal(result, 35);
    });

    it('can subtract two integer numbers', function () {
        var sut = new Evaluator();
        var result = sut.eval('300-5');
        assert.equal(result, 295);
    });
});

describe('Evaluator', function () {
    it('throws exception if null or empty string', function () {
        var sut = new Evaluator();
        assert.throws(function () {
            sut.eval("");
        }, Error);
    });

    it('evalutates one digit number to its integer value, like "7"', function () {
        checkEvaluation('7', 7);
    });

    it('evalutates one digit number to its integer value, like "5"', function () {
        checkEvaluation('5', 5);
    });

    it('evalutates multiple digit number to its integer value', function () {
        checkEvaluation('324', 324);
    });

    function checkEvaluation(expr, expected) {
        var sut = new Evaluator();
        var result = sut.eval(expr);
        assert.equal(result, expected);
    }
});

describe('Operand', function () {
    it('sets value property correctly in the constructor', function () {
        var sut = new Operand('123');
        assert.equal(sut.value, '123');
    });
});

describe('AddOperator', function () {
    it('computes correct value', function () {
        var sut = new AddOperator();
        var result = sut.compute(new Operand('10'), new Operand('20'));
        assert.equal(result, 30);
    });
});

describe('Parser', function () {
    it('parses addition elements', function () {
        var sut = new Parser();
        var result = sut.parse('1+2');

        assert.equal(result.length, 3);
        assert(result[0] instanceof Operand);
        assert(result[1] instanceof Operator);
        assert(result[2] instanceof Operand);
    });
});

describe('OperatorFactory', function () {
    it('returns add operator for plus sign', function () {
        var sut = new OperatorFactory();
        var result = sut.create('+');
        assert(result instanceof AddOperator);
    });

    it('returns sub operator for minus sign', function () {
        var sut = new OperatorFactory();
        var result = sut.create('-');
        assert(result instanceof SubOperator);
    });

    it('throws for unknown sign', function () {
        assert.throws(function () {
            var sut = new OperatorFactory();
            sut.create('x');
        });
    });
});