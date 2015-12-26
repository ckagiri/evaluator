var assert = require('assert');

function Evaluator() {
}

Evaluator.prototype.eval = function (s) {
    if (!s)
        throw new Error();
    var elements = this.parse(s);
    if (elements.length == 3) {
        if (elements[1].value == "+")
            return parseInt(elements[0].value) + parseInt(elements[2].value);
        if (elements[1].value == "-")
            return parseInt(elements[0].value) - parseInt(elements[2].value);
    }
    return parseInt(s);
};

Evaluator.prototype.parse = function (s) {
    var tokens = [],
        elements = [],
        currentWord = [],
        char,
        kind,
        lastKind, token,
        i, ii;
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
                elements.push(new Operator(token));
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
    this.value = val;
}

Operand.prototype = new Element();

function Operator(val) {
    this.value = val;
}

Operator.prototype = new Element();

describe('Evaluator', function () {
    it('can add two integer numbers', function () {
        var sut = new Evaluator();
        var result = sut.eval('10+25');
        assert.equal(result, 35);
    });

    it('can subtract two integer numbers', function () {
        var sut = new Evaluator();
        var result = sut.eval("300-5");
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
        checkEvaluation("7", 7);
    });

    it('evalutates one digit number to its integer value, like "5"', function () {
        checkEvaluation("5", 5);
    });

    it('evalutates multiple digit number to its integer value', function () {
        checkEvaluation("324", 324);
    });

    function checkEvaluation(expr, expected) {
        var sut = new Evaluator();
        var result = sut.eval(expr);
        assert.equal(result, expected);
    }

    it('parses addition elements', function () {
        var sut = new Evaluator();
        var result = sut.parse("1+2");

        assert.equal(result.length, 3);
        assert(result[0] instanceof Operand);
        assert(result[1] instanceof Operator);
        assert(result[2] instanceof Operand);
    });
});

describe('Operand', function () {
    it('sets value property correctly in the constructor', function () {
        var sut = new Operand('123');
        assert.equal(sut.value, '123');
    });
});

describe('Operator', function () {
    it('sets value property correctly in the constructor', function () {
        var sut = new Operator('+');
        assert.equal(sut.value, '+');
    });
});