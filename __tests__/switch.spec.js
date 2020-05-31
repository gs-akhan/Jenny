var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");

var jenny = new Jenny();

describe('Testing Switch Statement', () => {
    it('Switch should output 1', () => {

        let code = `
            (begin 
                (var x 100)
                
                (switch 
                    ((= x 100) 1)
                    ((= x 200) 2)
                    (else 500)
                )
            )
        `;

        expect(jenny.eval(JennyParser.parse(code))).toBe(1)
    });
});