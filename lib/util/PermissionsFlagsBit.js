const PermissionsFlags = require("./PermissionsFlags");
const Bitfield = require("./Bitfield");

/**
 * Data structure that makes it easy to interact with a bitfield 
 * @extends {Bitfield}
 */

class PermissionsFlagsBit extends Bitfield {
    constructor(bitfield) {
        super(bitfielf, PermissionsFlags);
    }
}


module.exports = PermissionsFlagsBit;
