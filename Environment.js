class Environment {


    /**Creates an environment with the given record */
    constructor(record = {}, parent = null) {
        this.record = record;
        this.parent = parent;
    }

    /** Creates a variable on the record given name and value */
    define(name, value) {
        this.record[name] = value;
        return value;
    }


    lookup(name) {
        return this.resolve(name).record[name];
    }

    setValue(name, value) {
        return this.resolve(name).record[name] = value;
    }

    resolve(name) {
        if (this.record.hasOwnProperty(name)) {
            return this;
        }

        //This is identifier resolution error.
        if (!this.parent) {
            return new ReferenceError(`Variable ${name} is not defined`);
        }

        return this.parent.resolve(name);
    }


}

module.exports = Environment;