var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var assert = require("assert");

var jenny = new Jenny();


describe('Testing Recursion', () => {
    it('should perform recursion', () => {
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

        let output = jenny.eval(JennyParser.parse(code));
        expect(output).toBe(120);
    });
});
