var Operand = require('../lib/Operand');
var AddOperator = require('../lib/AddOperator');
var SubOperator = require('../lib/SubOperator');
var MulOperator = require('../lib/MulOperator');
var DivOperator = require('../lib/DivOperator');
var assert = require('assert');

describe('AddOperator', function () {
    it('computes correct value', function () {
        var sut = new AddOperator();
        var result = sut.compute(new Operand(10), new Operand(20));
        assert.equal(result, 30);
    });
});

describe('SubOperator', function () {
    it('computes correct value', function () {
        var sut = new SubOperator();
        var result = sut.compute(new Operand(30), new Operand(10));
        assert.equal(result, 20);
    });
});

describe('MulOperator', function () {
    it('computes correct value', function () {
        var sut = new MulOperator();
        var result = sut.compute(new Operand(10), new Operand(25));
        assert.equal(result, 250);
    });
});

describe('DivOperator', function () {
    it('computes correct value', function () {
        var sut = new DivOperator();
        var result = sut.compute(new Operand(20), new Operand(10));
        assert.equal(result, 2);
    });
})