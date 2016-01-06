var Parser = require('../lib/Parser');
var OperatorFactory = require('../lib/OperatorFactory');
var OperandFactory = require('../lib/OperandFactory');
var Evaluator = require('../lib/Evaluator');
var assert = require('assert');

describe('Evaluator', function () {
    it('can add two integer numbers', function () {
        checkEvaluation('10+25', 35);
    });

    it('can subtract two integer numbers', function () {
        checkEvaluation('300-5', 295);
    });
    
    it('can multiply integer numbers', function () {
        checkEvaluation('12*30', 360);
    });

    it('can divide two integer numbers', function () {
        checkEvaluation('30/5', 6);
    });
    
    it('can handle multiple operations', function () {
        checkEvaluation("2+3*5-8/2", 13);
    });
    
    it('can handle complex expressions', function () {
        checkEvaluation("-2+3*(-5+8-9)/2", -11);
    });
    
    function checkEvaluation(expr, expected) {
        var parser = new Parser(new OperatorFactory(), new OperandFactory());
        var sut = new Evaluator(parser);
        var result = sut.eval(expr);
        assert.equal(result, expected);
    }
});