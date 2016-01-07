var Parser = require('./lib/Parser');
var OperatorFactory = require('./lib/OperatorFactory');
var OperandFactory = require('./lib/OperandFactory');
var Evaluator = require('./lib/Evaluator');

function create() {
    // simple test for ES5 support
    if (typeof Object.create !== 'function') {
        throw new Error('ES5 not supported by this JavaScript engine. ' +
            'Please load the es5-shim and es5-sham library for compatibility.');
    }

    var parser = new Parser(new OperatorFactory(), new OperandFactory());
    var evaluator = new Evaluator(parser);
    var matheval = evaluator;
    return matheval;
}

var matheval = create();

if (typeof window !== 'undefined') {
    window.matheval = matheval; // TODO: deprecate the mathjs namespace some day (replaced with 'math' since version 0.25.0)
}

// export the default instance
module.exports = matheval;