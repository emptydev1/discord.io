const MessageFlags = require("../util/MessageFlags");
const Bitfield = require("./Bitfield");

/**
 * Useful class for message flags bits
 * @extends {Bitfield}
 */

class MessageFlagsBits extends Bitfield {
    constructor(bitfield) {
        super(bitfield, MessageFlags);
    }
}


module.exports = MessageFlagsBits;
