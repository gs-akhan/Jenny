var Jenny = require("../Jenny");
var JennyParser = require("../parser/jennyParser");
var assert = require("assert");

var jenny = new Jenny();


assert.strictEqual(jenny.eval(JennyParser.parse(`(var age 10)`)), 10);


console.log('Variables Test Passed ✅');