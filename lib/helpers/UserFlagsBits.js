'use strict';

const UserFlags = require("../util/UserFlags");
const Bitfield = require("./Bitfield");

/**
 * Useful class for user flags bitfield 
 * @extends {Bitfield}
 */

class UserFlagsBit extends Bitfield {
    constructor(bitfield) {
        super(bitfield, UserFlags);
    }
}


module.exports = UserFlagsBit;
