var Operand = require('./Operand');
var Big = require('big.js');

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
    var BOOST = 10;
    var precedenceBoost = 0;
    for (i = 0; i < s.length; i++) {
        char = s[i];
        if (/[0-9]/g.test(char) || char === '.') {
            currentWord.push(char);
        } else {
            if (currentWord.length > 0) {
                tokens.push(currentWord.join(''));
                currentWord = [];
            }
            if (/\S/.test(char))
                tokens.push(char);
        }
    }
    if (currentWord.length > 0) {
        tokens.push(currentWord.join(''));
    }
    for (ii = 0; ii < tokens.length; ii++) {
        token = tokens[ii];
        kind = kindOf(token);
        switch (kind) {
            case 'numeric':
                var value = parseFloat(new Big(token));
                elements.push(this.operandFactory.create(value));
                break;
            case 'leftParen':
                precedenceBoost += BOOST;
                break;
            case 'rightParen':
                precedenceBoost -= BOOST;
                break;
            default:
                elements.push(this.operatorFactory.create(token, precedenceBoost));
        }
        lastKind = kind;
    }

    if (precedenceBoost > 0)
        throw new SyntaxError('Too many open parentheses');

    if (precedenceBoost < 0)
        throw new SyntaxError('Too many closed parentheses');

    return elements;

    function kindOf(t) {
        if (/[.0-9]/.test(t)) {
            return 'numeric';
        }
        else if (t === '(') {
            return 'leftParen';
        } else if (t === ')') {
            return 'rightParen';
        }
        else {
            return 'operator';
        }
    }
};

module.exports = Parser;