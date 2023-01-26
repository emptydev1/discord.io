'use strict';


class bitfield {
    constructor(bitfield, flags) {
        /**
         * Sets the value of bifield
         * @type {number|bigint}
         */
        this.bitfield = bitfield;

        /**
         * An object with bitfield flags
         * @type {object}
         */
        Object.defineProperty(this, 'flags', { value: flags });
    }

    parse() {
        const entries = Object.entries(this.flags);
        const array = [];

        for (const [field, bit] of entries) {
            if ((this.bitfield & bit) === bit) {
                array.push(field);
            }
        }

        return array;
    }
}


module.exports = bitfield;
