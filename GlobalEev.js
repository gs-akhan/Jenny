/***
 * 
 * Global Environment  
 * 
 */
var Environment = require("./Environment");

var GlobalEnv = new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: 0.1,
    "+"(op1, op2) {
        return op1 + op2;
    },
    "-"(op1, op2) {
        if (op2 == null) {
            return -op2;
        }
        return op1 - op2;
    },
    "*"(op1, op2) {
        return op1 * op2;
    },
    "/"(op1, op2) {
        return op1 / op2;
    },
    ">"(op1, op2) {
        return op1 > op2;
    },
    "<"(op1, op2) {
        return op1 < op2;
    },
    "="(op1, op2) {
        return op1 === op2;
    }
})

module.exports = GlobalEnv