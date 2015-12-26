var AddOperator = require('../lib/AddOperator');
var SubOperator = require('../lib/SubOperator');
var OperatorFactory = require('../lib/OperatorFactory');
var assert = require('assert');

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