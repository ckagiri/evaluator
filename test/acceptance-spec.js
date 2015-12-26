var Evaluator = require('../lib/Evaluator');
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