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
    GuildCreate: "guild_create",
    GuildDelete: "guild_delete",
    GuildUpdate: "guild_update",
    ChannelCreate: "channel_create",
    ChannelDelete: "channel_delete",
    ChannelUpdate: "channel_update",
    MessageCreage: "message_create",
    MessageDelete: "message_delete",
    MessageUpdate: "message_update",
    InteractionCreate: "interaction_create",
    Ready: "ready",
    Debug: "debug",
    Warn: "warn",
    ShardReady: "shard_ready",
    ShardError: "shard_error",
    ShardDisconnect: "shard_disconnect",
    ShardReconnect: "shard_reconnect",
    ShardClose: "shard_close"
}
