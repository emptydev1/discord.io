'use strict';

/**
 * @typedef {function} createdTimestamp 
 */

module.exports = function createdTimestamp(id) {
    id = Number(id);

    return (id / 4194304) + 1420070400000;
};
