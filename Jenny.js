var assert = require("assert");
var Environment = require("./Environment");
var jennyParser = require("./parser/jennyParser");

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
            return this.eval(exp[1], env) - this.eval(exp[2], env);
        }

        if (exp[0] === "+") {
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }
        if (exp[0] === "*") {
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }


        /****  Variable declarations */


        if (exp[0] === "var") {
            let [_, name, value] = exp;
            return env.define(name, this.eval(value, env))
        }

        if (isVariableName(exp)) {
            return env.lookup(exp);
        }


        /** Implementing Block  */
        if (exp[0] === "begin") {
            const blockEnv = new Environment({}, env);
            return this.evalBlock(exp, blockEnv);
        }

        //Implementing set keyword
        if (exp[0] === "set") {
            let [_, name, value] = exp;
            return env.setValue(name, this.eval(value, env))
        }
        //Implementing comparison operators operator
        if (exp[0] === "==") {
            return this.eval(exp[1], env) === this.eval(exp[2], env);
        }

        if (exp[0] === ">") {
            return this.eval(exp[1], env) > this.eval(exp[2], env);
        }

        if (exp[0] === "<") {
            return this.eval(exp[1], env) < this.eval(exp[2], env);
        }

        //Ending Comparision operators ============


        //Implementing if statement
        if (exp[0] === "if") {
            let [_, condition, consequent, alternative] = exp;
            if (this.eval(condition, env)) {
                return this.eval(consequent, env);
            } else {
                return this.eval(alternative, env);
            }
        }


        // Implementing while statement

        if (exp[0] === "while") {
            let [_, condition, expression] = exp;

            let result;
            while (this.eval(condition, env)) {
                result = this.eval(expression, env);
            }
            return result;
        }

        throw new Error(`Unexpected syntax ${exp[0]}`);
    }

    evalBlock(exp, blockEnv) {
        let result;
        let [_, ...block] = exp;
        block.forEach(expression => {
            result = this.eval(expression, blockEnv);
        });
        return result;
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

assert.strictEqual(jenny.eval(1), 1);
assert.strictEqual(jenny.eval(12), 12);
assert.strictEqual(jenny.eval(["+", ["+", ["+", 2, 2], 3], 2]), 9);

//Testing Minus operator



assert.strictEqual(jenny.eval(jennyParser.parse(`(- 5 5)`)), 0);

assert.strictEqual(jenny.eval('"HelloWorld"'), 'HelloWorld');

// Testing assignment 
assert.strictEqual(jenny.eval(jennyParser.parse(`(var x 10)`)), 10);

// Testing lookup to variable name

assert.strictEqual(jenny.eval("x"), 10);

//Testing assignment of booleans

assert.strictEqual(jenny.eval(jennyParser.parse(`(var isUser true)`)), true);

// Testing nested evaluation

assert.strictEqual(jenny.eval(jennyParser.parse(`(var z (+ 25 25))`)), 50);


// Testing scopes and blocks.
assert.strictEqual(jenny.eval(jennyParser.parse(
    `(begin 
        (var x 10)
        (var y 10)
        (* x y) 
    )`
)), 100);


// Testing nested blocks

assert.strictEqual(jenny.eval(jennyParser.parse(`
    (begin 
        (var x 10)
        (var y 10)
        (begin 
            (var z (+ x y))
        )
    )
`)), 20);

// Testing setting value

assert.strictEqual(jenny.eval(
    ["begin",
        ["var", "x", 10],
        ["var", "y", 100],
        ["set", "x", 200],
        ["begin",
            ["var", "z", 300],
            ["set", "x", 600] // overriding parent scope property x
        ],
        "x"
    ]
), 600);


assert.strictEqual(jenny.eval([

    "begin",
    ["var", "x", 100],
    ["var", "z", 200],
    ["if", ["==", "x", 100],
        ["set", "x", 200],
        ["set", "x", 300],
    ],
    "x"
]), 200);


assert.strictEqual(jenny.eval([
    "begin",
    ["var", "x", 1],
    ["while",
        ["<", "x", 100],
        ["set", "x", ["+", "x", 1]]
    ],
    "x"
]), 100)


assert.strictEqual(jenny.eval(jennyParser.parse(`
(begin 
    (var age 20)
    (set age 30)
    age
)`)), 30)


console.log("All cases passed ✅");

