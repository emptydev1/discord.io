'use strict';

/**
 * Represents a Collection 
 * @extends Map
*/

class Collection extends Map {
    first() {
        const data = [...super.values()];

        return data[0];
    }

    last() {
        const data = [...super.values()];

        return data[data.length - 1];
    }

    random() {
        const values = [...super.values()];
        const random = values[Math.floor(Math.random() * values.length)];

        return random;
    }

    add(key, data) {
        if (super.has(key)) return super.get(key);

        return super.set(key, data);
    }

    reduce(callback, initialValue) {
        const data = [...super.values()];

        return data.reduce(callback, initialValue);
    }

    sort(callback) {
        if (typeof(callback) !== 'function') throw new Error(`${callback} is not a function`);

        const data = [...super.values()];

        return data.sort(callback);
    }

    keysArray() {
        return [...super.keys()];
    }

    valuesArray() {
        return [...super.values()];
    }
}


module.exports = Collection;
