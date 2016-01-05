var Parser = require('../lib/Parser');
var OperatorFactory = require('../lib/OperatorFactory');
var OperandFactory = require('../lib/OperandFactory');
var Evaluator = require('../lib/Evaluator');
var assert = require('assert');

describe('Evaluator', function () {
    it('throws exception if null or empty string', function () {
        var parser = new Parser(new OperatorFactory(), new OperandFactory());
        var sut = new Evaluator(parser);
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

    it('adds two numbers', function () {
        checkEvaluation('1+2', 3);
    });

    it('subtracts two numbers', function () {
        checkEvaluation('88-20', 68);
    });

    it('multplies two numbers', function () {
        checkEvaluation('12*3', 36);
    });

    it('divides two numbers', function () {
        checkEvaluation('12/3', 4);
    });
    
    it('handles two operations', function () {
        checkEvaluation("2*3-5", 1);
    });

    function checkEvaluation(expr, expected) {
        var parser = new Parser(new OperatorFactory(), new OperandFactory());
        var sut = new Evaluator(parser);
        var result = sut.eval(expr);
        assert.equal(result, expected);
    }
});