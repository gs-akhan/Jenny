var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var jenny = new Jenny();


describe('Testing User defined functions', () => {
    it('should define function', () => {
        let code = `
        (begin
            (func addNumbers (x y) (+ x y))
            (addNumbers 10 10)
        )
        `;
        expect(jenny.eval(JennyParser.parse(code))).toBe(20);
    });



    it('should define multiple functions', () => {
        let output = jenny.eval(JennyParser.parse(`
            (begin
            
            (var glob 0)
            
            (func sqaure(i)
                (* i i)
            )

            (func add(i i)
                (+ (+ glob i) i)
            )
            
            (sqaure (add 1 1))

            )
        `));
        expect(output).toBe(4);

    });
});