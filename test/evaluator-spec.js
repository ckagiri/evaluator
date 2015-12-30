var Evaluator = require('../lib/Evaluator');
var assert = require('assert');

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

    function checkEvaluation(expr, expected) {
        var sut = new Evaluator();
        var result = sut.eval(expr);
        assert.equal(result, expected);
    }
});