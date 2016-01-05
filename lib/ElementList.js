var Operator = require('./Operator');
var Operation = require('./Operation');

function ElementList(elements) {
    this.elements = elements;
}

ElementList.prototype.findOperation = function () {
    for (var i = 0; i < this.elements.length; i++)
        if (this.elements[i] instanceof Operator)
            return new Operation(
                this.elements[i - 1],
                this.elements[i],
                this.elements[i + 1]);
    return null;
};

ElementList.prototype.replaceOperation = function (operation, operand) {
    var index = this.elements.indexOf(operation.lOperand);
    
    this.elements.splice(index + 2, 1);
    this.elements.splice(index + 1, 1);
    this.elements[index] = operand;
};

module.exports = ElementList;