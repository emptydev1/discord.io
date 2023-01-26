const UserFlagsBitfield = require("./UserFlagsBitfield");
const Bitfield = require("./bitfield");

/** 
  * Data structure that makes it easy to interact with a bitfield. 
  * @extends {BitField} 
  */

class UserFlags extends Bitfield {
    constructor(flags) {
        super(UserFlagsBitfield, flags);
    }
}


module.exports = UserFlags;
