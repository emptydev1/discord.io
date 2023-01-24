/**
 * Represents a Collection 
 * @extends Map
*/

class Collection extends Map {
    constructor(maxDataSize = null) {
        if ((maxDataSize !== null) && (typeof(maxDataSize) !== "number")) maxDataSize = null;
        this.maxDataSize = maxDataSize;
    }

    first() {
        return Array.from(this.values())[0];
    }

    last() {
        return Array.from(this.values())[this.size - 1];
    }

    random() {
        const values = Array.from(this.values());
        const random = values[Math.floor(Math.random() * values.length)];

        return random;
    }

    add(key, data) {
        if (this.has(key)) return this.get(key);

        return this.set(key, data);
    }

    reduce(callback, initialValue) {
        return Array.from(this.values()).reduce(callback, initialValue);
    }
}


module.exports = Collection;
