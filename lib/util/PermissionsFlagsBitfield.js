const PermissionsFlags = require("./PermissionsFlags");
const Bitfield = require("./bitfield");

/**
 * 
 * @extends {Bitfield}
 */

class PermissionsBitfield extends Bitfield {
    constructor(bitfield) {
        super(bitfielf, PermissionsFlags);
    }
}


module.exports = PermissionsBitfield;
