var Element = require('./Element');

function Operand(val) {
    this.value = val;
}

Operand.prototype = new Element();

module.exports = Operand;