'use strict';


/**
 * @typedef {Object} Status
 * @property {number} Ready
 * @property {number} Connecting
 * @property {number} Reconnecting
 * @property {number} Handshaking
 * @property {number} Disconnected
 * @property {number} WaitForGuilds
 * @property {number} Identifying
 * @property {number} Resuming
 */


module.exports = {
    Ready: 0,
    Connecting: 1,
    Reconnecting: 2,
    Handshaking: 3,
    Disconnected: 4,
    Identifying: 5,
    Resuming: 7
};
