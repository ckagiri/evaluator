var Operand = require('../lib/Operand');
var AddOperator = require('../lib/AddOperator');
var MulOperator = require('../lib/MulOperator');
var SubOperator = require('../lib/SubOperator');
var Operation = require('../lib/Operation');
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

    it('replaceOperation works', function () {
        var lOperand = new Operand(0);
        var op = new AddOperator();
        var rOperand = new Operand(0);
        var sut = new ElementList([lOperand, op, rOperand]);
        var operation = new Operation(lOperand, op, rOperand);

        sut.replaceOperation(operation, new Operand(0));

        var result = sut.findOperation();
        assert.equal(result, null);
    });

    it('replaceOperation replaces the correct one', function () {
        var otherOpd1 = new Operand(0);
        var otherOp = new AddOperator();
        var otherOpd2 = new Operand(0);
        var lOperand = new Operand(0);
        var op = new AddOperator();
        var rOperand = new Operand(0);
        var sut = new ElementList([otherOpd1, otherOp, otherOpd2, lOperand, op, rOperand]);
        var operation = new Operation(lOperand, op, rOperand);

        sut.replaceOperation(operation, new Operand(0));
        // to confirm the replacement was correct, findOperation should return the "other" one
        var result = sut.findOperation();
        assert.equal(result.lOperand, otherOpd1);
        assert.equal(result.op, otherOp);
        assert.equal(result.rOperand, otherOpd2);
    });

    it('first returns first element', function () {
        var lOperand = new Operand(0);
        var op = new AddOperator();
        var rOperand = new Operand(0);
        var sut = new ElementList([lOperand, op, rOperand]);

        var result = sut.first();

        assert.equal(result, lOperand);
    });

    it('findOperation returns highest precedence', function () {
        var lOperand = new Operand(0);
        var op = new MulOperator();
        var rOperand = new Operand(0);
        var sut = new ElementList([new Operand(0), new AddOperator(), new Operand(0), lOperand, op, rOperand]);
        var result = sut.findOperation();
        assert.equal(result.lOperand, lOperand);
        assert.equal(result.op, op);
        assert.equal(result.rOperand, rOperand);
    });

    it('findOperation can handle negative numbers', function () {
        var op = new SubOperator();
        var rOperand = new Operand(1);
        var sut = new ElementList([op, rOperand]);
        var result = sut.findOperation();

        assert.strictEqual(result.lOperand.value, 0);
        assert.equal(result.op, op);
        assert.equal(result.rOperand, rOperand);
    });

    it('replaceOperation can handle negative numbers', function () {
        var op = new SubOperator();
        var rOperand = new Operand(1);
        var sut = new ElementList([op, rOperand]);

        var operation = sut.findOperation();

        sut.replaceOperation(operation, new Operand(-1));

        assert.equal(sut.first().value, -1);
        assert.strictEqual(sut.findOperation(), null);
    });

    it('findOperation can handle two successive operators', function () {
        var opd1 = new Operand(1);
        var op1 = new AddOperator();
        var op2 = new SubOperator(10);
        var opd2 = new Operand(2);
        var sut = new ElementList([opd1, op1, op2, opd2]);
        
        var result = sut.findOperation();
        
        assert.equal(result.lOperand.value, 0);
        assert.equal(result.op, op2);
        assert.equal(result.rOperand, opd2);
    });
});