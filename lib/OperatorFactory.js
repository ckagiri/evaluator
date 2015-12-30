var AddOperator = require('./AddOperator');
var SubOperator = require('./SubOperator');
var MulOperator = require('./MulOperator');
var DivOperator = require('./DivOperator');

function OperatorFactory() { }

OperatorFactory.prototype.create = function (op) {
    switch (op) {
        case '+':
            return new AddOperator();
        case '-':
            return new SubOperator();
        case '*':
            return new MulOperator();
        case '/':
            return new DivOperator();
        default:
            throw new Error('unknown operator [' + op + ']');
    }
};

module.exports = OperatorFactory;