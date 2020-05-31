var JennyParser = require("../parser/jennyParser");
var Jenny = require("../Jenny");
var jenny = new Jenny();



describe('Testing Block Scope', () => {
    it('should declare and scope the variables in the block', () => {

        let code = `
            (begin 
                (var x 10)
                
                (begin
                    (var y 20)
                    (+ x y)    
                )
            )
        `

        let output = jenny.eval(JennyParser.parse(code));

        expect(output).toBe(30);
    });


    it('should update only block level variable', () => {
        let code = `
            (begin 
                (var name "john")

                (begin
                    (var name "jenny")
                )
                
                name
            )
        `
        expect(jenny.eval(JennyParser.parse(code))).toBe("john");
    });
});