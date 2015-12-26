var Element = require('./Element');

function Operand(val) {
    this.value = parseInt(val);
}

Operand.prototype = new Element();

module.exports = Operand;