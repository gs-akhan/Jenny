
var Environment = require("./Environment");
var globalEnv = require("./GlobalEev");

class Jenny {

    constructor(global = globalEnv) {
        this.global = global;
    }
    eval(exp, env = this.global) {
        if (isNumber(exp)) {
            return exp;
        }

        if (isString(exp)) {
            return exp.slice(1, -1);
        }

        if (isBoolean(exp)) {
            return true;
        }

        /****  Variable declarations */

        if (exp[0] === "var") {
            let [_, name, value] = exp;
            return env.define(name, this.eval(value, env))
        }

        if (isVariableName(exp)) {
            //console.log("here I am", exp[0])
            return env.lookup(exp);
        }


        /** Implementing Block  */
        if (exp[0] === "begin") {
            const blockEnv = new Environment({}, env);
            return this.evalBlock(exp, blockEnv);
        }

        //Implementing set keyword
        if (exp[0] === "set") {
            let [_, name, value] = exp;
            return env.setValue(name, this.eval(value, env))
        }


        //Ending Comparision operators ============


        //Implementing if statement
        if (exp[0] === "if") {
            let [_, condition, consequent, alternative] = exp;
            if (this.eval(condition, env)) {
                return this.eval(consequent, env);
            } else {
                return this.eval(alternative, env);
            }
        }


        // Implementing while statement

        if (exp[0] === "while") {
            let [_, condition, expression] = exp;

            let result;
            while (this.eval(condition, env)) {
                result = this.eval(expression, env);
            }
            return result;
        }

        // Function definition here
        if (exp[0] === "func") {
            let [_, funcName, params, body] = exp;

            const fn = {
                params,
                body,
                env
            }

            return env.define(funcName, fn);
        }

        if (exp[0] === "lambda") {
            let [_, params, body] = exp
            return {
                params,
                body,
                env
            }
        }


        console.log(exp);
        if (Array.isArray(exp)) {
            let fn = this.eval(exp[0], env);

            let args = exp.slice(1).map(arg => this.eval(arg, env));


            if (typeof fn === "function") {
                return fn(...args);
            }

            let activationRecord = {}
            fn.params.forEach((param, index) => {
                activationRecord[param] = args[index];
            });

            let activationEnv = new Environment(activationRecord, fn.env);

            return this.evalBody(fn.body, activationEnv);
        }

        //console.stack();
        //If this happens we have syntax error 
        throw new Error(`Unexpected syntax ${exp[0]}`);
    }


    evalBody(body, env) {
        if (body[0] === "begin") {
            return this.evalBlock(body, env);
        } else {
            return this.eval(body, env);
        }
    }
    evalBlock(exp, blockEnv) {
        let result;
        let [_, ...block] = exp;
        block.forEach(expression => {
            result = this.eval(expression, blockEnv);
        });
        return result;
    }



}


function isNumber(exp) {
    return typeof exp === "number";
}

function isString(exp) {
    return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}

function isArray(exp) {
    return Array.isArray(exp);
}

function isVariableName(exp) {
    //console.log(typeof exp === "string" && /^[+\-*/<>=a-zA-Z0-9_]*$/.test(exp), exp)
    return typeof exp === "string" && /^[+\-*/<>=a-zA-Z0-9_]*$/.test(exp)
}

function isBoolean(exp) {
    if (typeof exp === "boolean") {
        return exp;
    }
}

module.exports = Jenny