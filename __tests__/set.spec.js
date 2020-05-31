var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var jenny = new Jenny();


describe('Testing set expression', () => {
    it('should set or reassign the value to identifier', () => {
        
        let code = `
            (begin 
                (var name "eva")
                (set name "jenny")   
            )
        `
        
        let output = jenny.eval(JennyParser.parse(code));

        expect(output).toBe("jenny");
    });
});
