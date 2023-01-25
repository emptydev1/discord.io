'use strict';

/**
 * Represents a Discord Base
 * @abstract
*/

class Base {
    contructor(client) {
        /**
         * Defines a Client
         * @type {Client}
         * @readonly
        */
        Object.defineProperty(this, 'client', { value: client });
    }
}


module.exports = Base;
