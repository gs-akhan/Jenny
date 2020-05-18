var Jenny = require("./Jenny");
var assert = require("assert");
var jennyParser = require("./parser/jennyParser");

/**
 * Testing here ----------------------------
 */

var jenny = new Jenny();

assert.strictEqual(jenny.eval(1), 1);
assert.strictEqual(jenny.eval(12), 12);
assert.strictEqual(jenny.eval(["+", ["+", ["+", 2, 2], 3], 2]), 9);

assert.strictEqual(jenny.eval(["+", 1, 2]), 3);


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
    ["if", ["=", "x", 100],
        ["set", "x", 200],
        ["set", "x", 300],
    ],
    "x"
]), 200);


/**
 * Testing While loop
 */
assert.strictEqual(jenny.eval(jennyParser.parse(`
    (begin
        (var x 1)
        (while (< x 100)
            (set x (+ x 1))
        )
    )
`)), 100);


assert.strictEqual(jenny.eval(jennyParser.parse(`
(begin 
    (var age 20)
    (set age 30)
    age
)`)), 30);


assert.strictEqual(jenny.eval(jennyParser.parse(
    `(
        if (= 1 1) 
        1 
        2
    )
    `
)), 1)



console.log("ALL TESTS PASSED ✅")