var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var assert = require("assert");
var jenny = new Jenny();

// Testing Lambda function
describe('Testing lamda', () => {
    it('should iterate through lamda and output 300', () => {
        let output = jenny.eval(JennyParser.parse(`
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
        
        `));

        expect(output).toBe(300);
    });
});
