'use strict';

const PermissionsFlags = require("../util/PermissionsFlags");
const Bitfield = require("./Bitfield");

/**
 * Useful class for permissions flags bitfield
 * @extends {Bitfield}
 */

class PermissionsFlagsBit extends Bitfield {
    constructor(bitfield) {
        super(bitfield, PermissionsFlags);
    }
}


module.exports = PermissionsFlagsBit;
