const UserFlagsBitfield = require("./UserFlagsBitfield");
const Bitfield = require("./Bitfield");

/** 
  * Data structure that makes it easy to interact with a bitfield. 
  * @extends {BitField} 
  */

class UserFlags extends Bitfield {
    constructor(bitfield) {
        super(bitfield, UserFlagsBitfield);
    }
}


module.exports = UserFlags;
