var JennyParser = require("../parser/jennyParser");
var Jenny = require("../Jenny");
var jenny = new Jenny();



describe('Testing While statement', () => {
    it('should iterate over block for 5 times', () => {

        let code = `
        
            (begin
                (var result 0) 
                (while (< result 10)
                    (set result (+ result 1))
                )
            )
        `
        expect(jenny.eval(JennyParser.parse(code))).toBe(10);
    });
});