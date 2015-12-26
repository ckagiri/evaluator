var Operand = require('../lib/Operand');
var Operator = require('../lib/Operator');
var Parser = require('../lib/Parser');
var assert = require('assert');

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