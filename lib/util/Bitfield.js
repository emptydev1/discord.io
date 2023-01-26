const UserFlagsBitfield = require("./UserFlagsBitfield");


class bitfield {
    constructor(bitfield) {
        this.bitfield = bitfield;
    }

    parse() {
        const entries = Object.entries(UserFlagsBitfield);
        const array = [];

        for (const [field, bit] of entries) {
            if ((this.bitfield & bit) === bit) {
                array.push(field);
            }
        }

        return array;
    }
}


module.exports = bitfield;
