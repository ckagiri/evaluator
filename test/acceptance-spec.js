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
    
    function checkEvaluation(expr, expected) {
        var sut = new Evaluator();
        var result = sut.eval(expr);
        assert.equal(result, expected);
    }
});