'use strict';

/**
 * @typedef {object} UserFlagsBitfield
 * @property {number} STAFF
 * @property {number} PARTNER
 * @property {number} HYPESQUAD
 * @property {number} BUG_HUNTER_LEVEL_1
 * @property {number} HYPESQUAD_ONLINE_HOUSE_1
 * @property {number} HYPESQUAD_ONLINE_HOUSE_2
 * @property {number} HYPESQUAD_ONLINE_HOUSE_3
 * @property {number} PREMIUM_EARLY_SUPPORTER
 * @property {number} TEAM_PSEUDO_USER
 * @property {number} BUG_HUNTER_LEVEL_2
 * @property {number} VERIFIED_BOT
 * @property {number} VERIFIED_DEVELOPER
 * @property {number} CERTIFIED_MODERATOR
 * @property {number} BOT_HTTP_INTERACTIONS
 * @property {number} ACTIVE_DEVELOPER
 */


module.exports = {
    STAFF: 1 << 0,
    PARTNER: 1 << 1,
    HYPESQUAD: 1 << 2,
    BUG_HUNTER_LEVEL_1: 1 << 3,
    HYPESQUAD_ONLINE_HOUSE_1: 1 << 6,
    HYPESQUAD_ONLINE_HOUSE_2: 1 << 7,
    HYPESQUAD_ONLINE_HOUSE_3: 1 << 8,
    PREMIUM_EARLY_SUPPORTER: 1 << 9,
    TEAM_PSEUDO_USER: 1 << 10,
    BUG_HUNTER_LEVEL_2: 1 << 14,
    VERIFIED_BOT: 1 << 16,
    VERIFIED_DEVELOPER: 1 << 17,
    CERTIFIED_MODERATOR: 1 << 18,
    BOT_HTTP_INTERACTIONS: 1 << 19,
    ACTIVE_DEVELOPER: 1 << 22
};
