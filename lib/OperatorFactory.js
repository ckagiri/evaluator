var AddOperator = require('./AddOperator');
var SubOperator = require('./SubOperator');
var MulOperator = require('./MulOperator');
var DivOperator = require('./DivOperator');

function OperatorFactory() { }

OperatorFactory.prototype.create = function (op, precedenceBoost) {
    switch (op) {
        case '+':
            return new AddOperator(precedenceBoost);
        case '-':
            return new SubOperator(precedenceBoost);
        case '*':
            return new MulOperator(precedenceBoost);
        case '/':
            return new DivOperator(precedenceBoost);
        default:
            throw new Error('unknown operator [' + op + ']');
    }
};

module.exports = OperatorFactory;