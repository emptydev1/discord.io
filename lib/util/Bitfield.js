'use strict';

/**
 * Manage Discord Flags bitfield 
 */

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

    /**
     * Converts the bitfield parameter to an object
     * @type {object}
     */
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

    /**
     * Check if the bitfield parameter includes a value
     * @type {boolean}
     */
    has(bit) {
        return (this.bitfield & bit) === bit;
    }
}


module.exports = bitfield;
