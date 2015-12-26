var Element = require('./Element');

function Operator(val) {
    this.value = val;
}

Operator.prototype = new Element();

module.exports = Operator;