var Operand = require('./Operand');

function Operation(lOperand, op, rOperand) {
    this.lOperand = lOperand;
    this.op = op;
    this.rOperand = rOperand;
}

Operation.prototype.compute = function () {
    return new Operand(this.op.compute(this.lOperand, this.rOperand));
};

module.exports = Operation;
