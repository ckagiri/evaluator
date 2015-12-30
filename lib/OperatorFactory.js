var AddOperator = require('./AddOperator');
var SubOperator = require('./SubOperator');

function OperatorFactory() { }

OperatorFactory.prototype.create = function (op) {
    switch (op) {
        case '+':
            return new AddOperator();
        case '-':
            return new SubOperator();
        default:
            throw new Error('unknown operator [' + op + ']');
    }
};

module.exports = OperatorFactory;