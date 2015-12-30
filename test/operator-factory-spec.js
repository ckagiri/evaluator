var AddOperator = require('../lib/AddOperator');
var SubOperator = require('../lib/SubOperator');
var MulOperator = require('../lib/MulOperator');
var DivOperator =  require('../lib/DivOperator');
var OperatorFactory = require('../lib/OperatorFactory');
var assert = require('assert');

describe('OperatorFactory', function () {
    var sut;
    beforeEach(function () {
        sut = new OperatorFactory();
    });

    it('returns add-operator for plus sign', function () {
        check('+', AddOperator);
    });

    it('returns sub-operator for minus sign', function () {
        check('-', SubOperator);
    });

    it('throws for unknown sign', function () {
        assert.throws(function () {
            sut.create('x');
        });
    });

    it('returns mul-operator for asterisk sign', function () {
        check('*', MulOperator);
    });
    
    it('returns div-operator for slash sign', function () {
        check('/', DivOperator);
    });

    function check(op, type) {
        var result = sut.create(op);
        assert(result instanceof type);
    };
});