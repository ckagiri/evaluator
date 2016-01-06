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
    
    it('takes precedence into account', function () {
        var sut = new AddOperator(7);
        assert.equal(sut.precedence, 8);
    });
});

describe('SubOperator', function () {
    it('computes correct value', function () {
        var sut = new SubOperator();
        var result = sut.compute(new Operand(30), new Operand(10));
        assert.equal(result, 20);
    });
    
    it('takes precedence into account', function () {
        var sut = new SubOperator(7);
        assert.equal(sut.precedence, 8);
    });
});

describe('MulOperator', function () {
    it('computes correct value', function () {
        var sut = new MulOperator();
        var result = sut.compute(new Operand(10), new Operand(25));
        assert.equal(result, 250);
    });
    
    it('takes precedence into account', function () {
        var sut = new MulOperator(7);
        assert.equal(sut.precedence, 9);
    });
});

describe('DivOperator', function () {
    it('computes correct value', function () {
        var sut = new DivOperator();
        var result = sut.compute(new Operand(20), new Operand(10));
        assert.equal(result, 2);
    });
    
    it('takes precedence into account', function () {
        var sut = new DivOperator(7);
        assert.equal(sut.precedence, 9);
    });
});

describe('Operator', function () {
    it('Operator-precedence is set correctly', function () {
        assert.equal(new AddOperator().precedence, 1);
        assert.equal(new SubOperator().precedence, 1);
        assert.equal(new MulOperator().precedence, 2);
        assert.equal(new DivOperator().precedence, 2);
    });
});