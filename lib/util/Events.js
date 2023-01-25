'use strict';

/**
 * @typedef {Object} Events
 * @property {String} GuildCreate
 * @property {String} GuildDelete
 * @property {String} GuildUpdate
 * @property {String} ChannelCreate
 * @property {String} ChannelDelete
 * @property {String} ChannelUpdate
 * @property {String} MessageCreate
 * @property {String} MessageDelete
 * @property {String} MessageUpdate
 * @property {String} InteractionCreate
 * @property {String} Ready
 * @property {String} Debug
 * @property {String} Warn
 * @property {String} ShardReady
 * @property {String} ShardError
 * @property {String} ShardDisconnect
 * @property {String} ShardClose
*/


module.exports = {
    GuildCreate: "guildCreate",
    GuildDelete: "guildDelete",
    GuildUpdate: "guildUpdate",
    ChannelCreate: "channelCreate",
    ChannelDelete: "channelDelete",
    ChannelUpdate: "channelUpdate",
    MessageCreage: "messageCreate",
    MessageDelete: "messageDelete",
    MessageUpdate: "messageUpdate",
    InteractionCreate: "interactionCreate",
    Ready: "ready",
    Debug: "debug",
    Warn: "warn",
    ShardReady: "shardReady",
    ShardError: "shardError",
    ShardDisconnect: "shardDisconnect",
    ShardClose: "shardClose"
}
