var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var assert = require("assert");
var jenny = new Jenny();


let code = `
    (begin 
        (var x 100)
        
        (switch 
            ((= x 100) 1)
            ((= x 200) 2)
            (else 500)
        )
    )
`
assert.strictEqual(jenny.eval(JennyParser.parse(code)), 1);


console.log("Switch Test passed ✅");