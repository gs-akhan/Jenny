var assert = require("assert");
var Environment = require("./Environment");
class Jenny {

    constructor(global = new Environment()) {
        this.global = global;
    }
    eval(exp, env = this.global) {
        if (isNumber(exp)) {
            return exp;
        }

        if (isString(exp)) {
            return exp.slice(1, -1);
        }

        if (exp[0] === "-") {
            return this.eval(exp[1]) - this.eval(exp[2]);
        }

        if (exp[0] === "+") {
            return this.eval(exp[1]) + this.eval(exp[2]);
        }

        /****  Variable declarations */


        if (exp[0] === "var") {
            let [_, name, value] = exp;
            return this.global.define(name, this.eval(value))
        }

        if (isVariableName(exp)) {
            return this.global.lookup(exp);
        }

        throw new Error(`Unexpected syntax ${exp[0]}`);
    }
}


function isNumber(exp) {
    return typeof exp === "number";
}

function isString(exp) {
    return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}

function isArray(exp) {
    return Array.isArray(exp);
}

function isVariableName(exp) {
    return typeof exp === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp)
}

/**
 * Testing here ----------------------------
 */

var jenny = new Jenny(new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: 0.1
}));

assert.strictEqual(jenny  .eval(1), 1);
assert.strictEqual(jenny.eval(12), 12);
assert.strictEqual(jenny.eval(["+", ["+", ["+", 2, 2], 3], 2]), 9);

//Testing Minus operator

assert.strictEqual(jenny.eval(["-", 5, 5]), 0);

assert.strictEqual(jenny.eval('"HelloWorld"'), 'HelloWorld');

// Testing assignment 
assert.strictEqual(jenny.eval(["var", "x", 10]), 10);

// Testing lookup to variable name

assert.strictEqual(jenny.eval("x"), 10);

//Testing assignment of booleans

assert.strictEqual(jenny.eval(["var", "isUser", "true"]), true);

// Testing nested evaluation

assert.strictEqual(jenny.eval(["var", "z", ["+", 25, 25]]), 50);

console.log("All cases passed");


