var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var assert = require("assert");
var jenny = new Jenny();

// Testing Lambda function
assert.strictEqual(jenny.eval(JennyParser.parse(`
    (begin 
        (func onClick (callback)
            (begin 
                (var x 10)
                (var y 20)
                (callback (+ x y)) 
            )
        )
        (onClick (lambda (data) (* data 10)))
    )

`)), 300);

console.log("Lambda Test Passed ✅")