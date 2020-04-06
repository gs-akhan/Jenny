class Environment {


    /**Creates an environment with the given record */
    constructor(record = {}) {
        this.record = record;
    }

    /** Creates a variable on the record given name and value */
    define(name, value) {
        this.record[name] = value;
        return value;
    }


    lookup(name) {
        if(this.record.hasOwnProperty(name)) {
            return this.record[name];
        } else {
            throw new ReferenceError(`Variable ${name} is not defined`);
        }
    }

}

module.exports = Environment;