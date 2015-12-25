var assert = require('assert');

function Evaluator() {
}

Evaluator.prototype.eval = function (s) {
    if (!s)
        throw new Error();
    var parts;
    if (s.indexOf('+') >= 0) {
        parts = s.split('+');
        return parseInt(parts[0]) + parseInt(parts[1]);
    }
    else if (s.indexOf('-') >= 0) {
        parts = s.split('-');
        return parseInt(parts[0]) - parseInt(parts[1]);
    }
    else
        return parseInt(s);
};

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
        var sut = new Evaluator();
        var result = sut.eval("7");
        assert.equal(result, 7);
    });

    it('evalutates one digit number to its integer value, like "5"', function () {
        var sut = new Evaluator();
        var result = sut.eval("5");
        assert.equal(result, 5);
    });

    it('evalutates multiple digit number to its integer value', function () {
        var sut = new Evaluator();
        var result = sut.eval("324");
        assert.equal(result, 324);
    });
});