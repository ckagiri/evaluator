var OperatorFactory = require('./OperatorFactory');
var Operand = require('./Operand');

function Parser() {
}

Parser.prototype.parse = function (s) {
    var tokens = [],
        elements = [],
        currentWord = [],
        char,
        kind,
        lastKind, token,
        i, ii;
    var operatorFactor = new OperatorFactory();
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
                elements.push(new Operand(token));
                break;
            default:
                elements.push(operatorFactor.create(token));
        }
        lastKind = kind;
    }
    return elements;
    function kindOf(word) {
        if (/[0-9]/g.test(word)) {
            return 'numeric';
        } else {
            return 'operator';
        }
    }
};

module.exports = Parser;