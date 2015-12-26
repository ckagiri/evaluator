var Evaluator = require('../lib/Evaluator');
var Operand = require('../lib/Operand');
var Operator = require('../lib/Operator');
var AddOperator = require('../lib/AddOperator');
var SubOperator = require('../lib/SubOperator');
var Parser = require('../lib/Parser');
var OperatorFactory = require('../lib/OperatorFactory');
var assert = require('assert');

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