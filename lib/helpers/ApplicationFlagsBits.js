'use strict';

const ApplicationFlags = require("../util/ApplicationFlags");
const Bitfield = require("./Bitfield");

/**
 * Class useful for application flags bitfield
 * @extends {Bitfield}
 */

class ApplicationFlagsBits extends Bitfield {
    constructor(bitfield) {
        super(bitfield, ApplicationFlags);
    }
}


module.exports = ApplicationFlagsBits;
