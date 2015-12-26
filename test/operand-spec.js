var Operand = require('../lib/Operand');
var assert = require('assert');

describe('Operand', function () {
    it('sets value property correctly in the constructor', function () {
        var sut = new Operand('123');
        assert.equal(sut.value, '123');
    });
});