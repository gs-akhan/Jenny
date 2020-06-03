#!/usr/bin/env node

var JennyParser = require("./parser/jennyParser");
var Jenny = require("./Jenny");
var jenny = new Jenny();
var fs = require("fs");

var args = process.argv;
let [_node, _cmd, file] = args;
if (!file) {
    console.log("File missing to exeute");
    console.info("> jenny <fileName.jn>");
    return;
}


var fileToExec = fs.readFileSync(process.cwd() + "/" + file);

let content = fileToExec.toString();


jenny.eval(JennyParser.parse(content));