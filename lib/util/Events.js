'use strict';

/**
 * @typedef {Object} Events
 * @property {String} Ready
 * @property {String} Debug
 * @property {String} Warn
 * @property {String} ShardReady
 * @property {String} ShardError
 * @property {String} ShardDisconnect
 * @property {String} ShardClose
*/


module.exports = {
    Ready: "ready",
    Debug: "debug",
    Warn: "warn",
    ShardReady: "shardReady",
    ShardError: "shardError",
    ShardDisconnect: "shardDisconnect",
    ShardClose: "shardClose"
}
