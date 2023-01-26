const UserFlags = require("./UserFlags");
const Bitfield = require("./Bitfield");

/** 
  * Data structure that makes it easy to interact with a bitfield. 
  * @extends {BitField} 
  */

class UserFlagsBit extends Bitfield {
    constructor(bitfield) {
        super(bitfield, UserFlagsBitfield);
    }
}


module.exports = UserFlagsBit;
