var JennyParser = require("../parser/jennyParser");
var Jenny = require("../Jenny");
var jenny = new Jenny();



describe('Testing For statement/loop', () => {
    it('should iterate over block for 10 times', () => {

        let code = `
            (begin
                (var result 1)
                (for (var x 1) (< x 10) (set x (+ x 1))
                    (begin 
                        (set result (+ result x))
                    )
                )
            )
        `
        expect(jenny.eval(JennyParser.parse(code))).toBe(10);
    });
});
