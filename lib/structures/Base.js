'use strict';

/**
 * Represents a Discord Base
 * @abstract
*/

class Base {
    contructor(client, data) {
        /**
         * Defines a Client
         * @type {Client}
         * @readonly
        */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * Defines a data
         * @type {Object?}
         * @readonly
        */
        Object.defineProperty(this, 'data', { value: data });
    }


    /**
     * Get the creation date of a Discord channel, guild or user 
     * @returns {Number}
     * @prop {Number} id The ID of a Discodd channel, guild or user
    */
    get createdTimestamp() {
        return Math.floor((this.data?.id / 4194304) + 1420070400000);
    }
}


module.exports = Base;
