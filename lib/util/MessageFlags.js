'use strict';

/**
 * @typedef {object} Message flags
 * @property {number} CROOSPOSTED
 * @property {number} IS_CROSSPOST
 * @property {number} SUPPRESS_EMBEDS
 * @property {number} SOURCE_MESSAGE_DELETED
 * @property {number} URGENT
 * @property {number} HAS_THREAD
 * @property {number} EPHEMERAL
 * @property {number} LOADING
 * @property {number} FAILED_TO_MENTION_SOME_ROLES_IN_THREAD
 */


module.exports = {
    CROOSPOSTED: 1 << 0,
    IS_CROSSPOST: 1 << 1,
    SUPPRESS_EMBEDS: 1 << 2,
    SOURCE_MESSAGE_DELETED: 1 << 3,
    URGENT: 1 << 4,
    HAS_THREAD: 1 << 5,
    EPHEMERAL: 1 << 6,
    LOADING: 1 << 7,
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD: 1 << 8
};
