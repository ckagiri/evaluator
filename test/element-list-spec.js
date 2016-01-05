var Operand = require('../lib/Operand');
var AddOperator = require('../lib/AddOperator');
var ElementList = require('../lib/ElementList');
var assert = require('assert');

describe('ElementList', function () {
    it('findOperation returns first operation', function () {
        var lOperand = new Operand(0);
        var op = new AddOperator();
        var rOperand = new Operand(0);
        var sut = new ElementList([
            new Operand(0), new Operand(0), lOperand, op, rOperand
        ]);

        var result = sut.findOperation();

        assert.equal(result.lOperand, lOperand);
        assert.equal(result.op, op);
        assert.equal(result.rOperand, rOperand);
    });
});