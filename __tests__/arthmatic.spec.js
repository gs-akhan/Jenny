var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var jenny = new Jenny();
var run = function (code) {
    return jenny.eval(JennyParser.parse(code))
}

describe('Testing Arthmatic Functions', () => {
    it('should add two numbers', () => {
        expect(run(`(+ 10 10)`)).toBe(20);
    });


    it('should multiply two numbers', () => {
        expect(run(`(* 10 10)`)).toBe(100);
    });


    it('should compare numbers', () => {
        expect(run(`(= 10 10)`)).toBe(true);
    });

    it('should divide numbers', () => {
        expect(run(`(/ 10 10)`)).toBe(1);
    });


    it('should add nested numbers', () => {
        expect(run(`(+ (+ 1 (+ 2 2)) 10)`)).toBe(15);
    });

});