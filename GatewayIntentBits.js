const { GatewayIntents } = require("../util/Gateway");
const Bitfield = require("./Bitfield");

/**
 * Class useful for Gateway Intents 
 * @extends {Bitfield}
 */

class GatewayIntentBits extends Bitfield {
    /**
     * Set the bitfield
     * @type {number|bigint}
     */
    static bitfield = null;

    constructor(bitfield) {
        super(bitfield, GatewayIntents);

        this.bitfield = bitfield;
    }
}


module.exports = GatewayIntentBits;
