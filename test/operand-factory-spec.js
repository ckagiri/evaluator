var OperandFactory = require('../lib/OperandFactory');
var Operand = require('../lib/Operand');
var assert = require('assert');

describe('OperandFactory', function () {
    it('create returns operand', function () {
        var sut = new OperandFactory();
        var result = sut.create(5);
        assert(result instanceof Operand);
    });
    
    it('create returns operand with correct value', function () {
        var sut = new OperandFactory();
        var result = sut.create(5);
        assert.equal(result.value, 5);
    })
});