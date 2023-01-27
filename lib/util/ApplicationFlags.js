'use strict';

/**
 * @typedef {Object} Application Flags
 * @property {number} GATEWAY_PRESENCE
 * @property {number} GATEWAY_PRESENCE_LIMITED
 * @property {number} GATEWAY_GUILD_MEMBERS
 * @property {number} GATEWAY_GUILD_MEMBERS_LIMITED
 * @property {number} VERIFICATION_PENDING_GUILD_LIMIT
 * @property {number} EMBEDDED
 * @property {number} GATEWAY_MESSAGE_CONTENT
 * @property {number} GATEWAY_MESSAGE_CONTENT_LIMITED
 * @property {number} APPLICATION_COMMAND_BADGE
 */


module.exports = {
    GATEWAY_PRESENCE: 1 << 12,
    GATEWAY_PRESENCE_LIMITED: 1 << 13,
    GATEWAY_GUILD_MEMBERS: 1 << 14,
    GATEWAY_GUILD_MEMBERS_LIMITED: 1 << 15,
    VERIFICATION_PENDING_GUILD_LIMIT: 1 << 16,
    EMBEDDED: 1 << 17,
    GATEWAY_MESSAGE_CONTENT: 1 << 18,
    GATEWAY_MESSAGE_CONTENT_LIMITED: 1 << 19,
    APPLICATION_COMMAND_BADGE: 1 << 23
};
