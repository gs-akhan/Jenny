var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var assert = require("assert");

var jenny = new Jenny();

let code = `
    (begin 
        (func factorial (input)
            (if (= input 1)
                1
                (* input (factorial (- input 1)))
            )

        )   
        (factorial 5)
    )
`

var ast = JennyParser.parse(code);
var output = jenny.eval(ast);

assert.strictEqual(output, 120);
console.log("Recurssion Passed ✅");
//test