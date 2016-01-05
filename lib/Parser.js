var Operand = require('./Operand');

function Parser(operatorFactory, operandFactory) {
    this.operatorFactory = operatorFactory;
    this.operandFactory = operandFactory;
}

Parser.prototype.parse = function (s) {
    var tokens = [],
        elements = [],
        currentWord = [],
        char, token,
        kind, lastKind,
        i, ii;
    for (i = 0; i < s.length; i++) {
        char = s[i];
        kind = kindOf(char);
        if (kind !== lastKind) {
            if (currentWord.length > 0) {
                tokens.push(currentWord.join(''));
                currentWord = [];
            }
        }
        switch (kind) {
            case 'numeric':
                currentWord.push(char);
                break;
            default:
                tokens.push(char);
                break;
        }
        lastKind = kind;
    }
    if (currentWord.length > 0) {
        tokens.push(currentWord.join(''));
    }
    lastKind = null;
    for (ii = 0; ii < tokens.length; ii++) {
        token = tokens[ii];
        kind = kindOf(token);
        switch (kind) {
            case 'numeric':
                elements.push(this.operandFactory.create(parseInt(token)));
                break;
            default:
                elements.push(this.operatorFactory.create(token));
        }
        lastKind = kind;
    }
    return elements;
    
    function kindOf(charWord) {
        if (/[0-9]/g.test(charWord)) {
            return 'numeric';
        } else {
            return 'operator';
        }
    }
};

module.exports = Parser;