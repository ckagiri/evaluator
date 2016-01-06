var SubOperator = require('./lib/SubOperator');
var AddOperator = require('./lib/AddOperator');
var MulOperator = require('./lib/MulOperator');
var DivOperator = require('./lib/DivOperator');
var Parser = require('./lib/Parser');
var OperatorFactory = require('./lib/OperatorFactory');
var OperandFactory = require('./lib/OperandFactory');

var sut = new Parser(new OperatorFactory(), new OperandFactory());

var result = sut.parse('(1+2)');
        
console.log(result);
