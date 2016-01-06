var SubOperator = require('./lib/SubOperator');
var Operand = require('./lib/Operand');
var ElementList = require('./lib/ElementList');

var op = new SubOperator();
var rOperand = new Operand(1);
var sut = new ElementList([op, rOperand]);

var operation = sut.findOperation();

sut.replaceOperation(operation, new Operand(-1));

