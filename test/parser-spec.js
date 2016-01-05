var Operand = require('../lib/Operand');
var Operator = require('../lib/Operator');
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
});