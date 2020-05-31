var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var assert = require("assert");

var jenny = new Jenny();

//Testing variables

describe('Testing variable declaration', () => {
    it('should set value to 10 and return 10', () => {

        let output = jenny.eval(JennyParser.parse(`(var age 10)`));
        expect(output).toBe(10);

    });


    it('should declare variable and then able to set the value', () => {

        let output = jenny.eval(JennyParser.parse(`
            (begin 
                (var age 10)
                (set age 20)    
            )
        
        `));
        expect(output).toBe(20);

    });

    

});

