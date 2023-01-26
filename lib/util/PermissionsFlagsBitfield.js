const PermissionsFlags = require("./PermissionsFlags");
const Bitfield = require("./bitfield");

/**
 * 
 * @extends {Bitfield}
 */

class PermissionsFlagsBit extends Bitfield {
    constructor(bitfield) {
        super(bitfielf, PermissionsFlags);
    }
}


module.exports = PermissionsFlagsBit;
