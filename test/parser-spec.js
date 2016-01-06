var Operand = require('../lib/Operand');
var Operator = require('../lib/Operator');
var SubOperator = require('../lib/SubOperator');
var OperatorFactory = require('../lib/OperatorFactory');
var OperandFactory = require('../lib/OperandFactory');
var Parser = require('../lib/Parser');
var assert = require('assert');
var sinon = require('sinon');

describe('Parser', function () {
    it('parses addition elements', function () {
        var sut = new Parser(new OperatorFactory(), new OperandFactory());

        var result = sut.parse('1+2');

        assert.equal(result.length, 3);
        assert(result[0] instanceof Operand);
        assert(result[1] instanceof Operator);
        assert(result[2] instanceof Operand);
    });

    it('calls OperandFactory create', function () {
        var operandFactory = new OperandFactory();
        var mock = sinon.mock(operandFactory);
        mock.expects('create').once();

        var sut = new Parser(new OperatorFactory(), operandFactory);
        sut.parse('1');
        mock.verify();
    });

    it('multiple operand and operators are parsed correctly', function () {
        var sut = new Parser(new OperatorFactory(), new OperandFactory());

        var result = sut.parse('1+2*3-4');

        assert.equal(result.length, 7);
        assert(result[0] instanceof Operand);
        assert(result[1] instanceof Operator);
        assert(result[2] instanceof Operand);
        assert(result[3] instanceof Operator);
        assert(result[4] instanceof Operand);
        assert(result[5] instanceof Operator);
        assert(result[6] instanceof Operand);
    });

    it('handles negative numbers', function () {
        var sut = new Parser(new OperatorFactory(), new OperandFactory());
        
        var result = sut.parse('-3');
        
        assert.equal(result.length, 2);
        assert(result[0] instanceof SubOperator);
        assert.equal(result[1].value, 3);
    });
});