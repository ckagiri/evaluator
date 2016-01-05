var Operand = require('./Operand');

function OperandFactory() { }

OperandFactory.prototype.create = function (value) {
    return new Operand(value);
};

module.exports = OperandFactory;