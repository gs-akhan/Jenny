class Transformer {
    transformSwitchToIf(exp) {
        const [_, ...cases] = exp;

        const finalIF = ["if", null, null, null];


        let currentIF = finalIF;

        let completeIteration = false;
        cases.forEach((_case, i) => {

            if (completeIteration) { return; }
            let [condition, body] = _case;


            currentIF[1] = condition;
            currentIF[2] = body;


            let nextCase = cases[i + 1];


            let [nextIf, nextBody] = nextCase;
            if (nextIf === 'else') {
                completeIteration = true;
                currentIF[3] = nextBody;
            } else {
                currentIF[3] = ["if", null, null, null];
                currentIF = currentIF[3];
            }

        });

        return finalIF;
    }

    transformForToWhile(exp) {

        let [_, initialization, condition, incrementer, body] = exp;

        body.push(incrementer);

        let whileLoop = ["while", condition /*condition*/, body, /*body */];

        let finalWhileLoop = ["begin", initialization, whileLoop];

        return finalWhileLoop;
    }

}


module.exports = Transformer;