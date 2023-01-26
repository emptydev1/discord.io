const Bitfield = require("./bitfield");

/**
 * Represents a user flags bitfield
 * @extends Bitfield
 */

class UserFlags extends Bitfield {
    constructor(flags) {
        super(flags);
    }
}


module.exports = UserFlags;
