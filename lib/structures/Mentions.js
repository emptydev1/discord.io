'use strict';

const Collection = require("../util/Collection");
const User = require("./User");

/**
 * Represents a Discord Message mentions
 * @prop {Collection} users Collection with the message user's mentions
 * @prop {Collection} channels Collection with the message channel's mentions
 * @prop {Collection} roles Collection with the message role's mentions
 * @prop {boolean} Whether the message contains a mention of everyone
 * @prop {User} replyTo The user that was answered, or null if there was none
 */

class Mentions {
    constructor(client, data = {}) {
        this.users = new Collection();
        this.channels = new Collection();
        this.roles = new Collection();
        this.everyone = false;
        this.replyTo = null;

        if ('mentions' in data) {
            for (const user of data.mentions) this.users.set(user.id, user);
        }

        if ('mention_channels' in data) {
            for (const channel of data.mention_channels) this.channels.set(channel.id, channel);
        }

        if ('mention_roles' in data) {
            for (const role of data.mention_roles) this.roles.set(role.id, role);
        }

        if ('referenced_message' in data) this.replyTo = new User(client, data.referenced_message.author);
        
        if (data?.mention_everyone) this.everyone = true;
    }
}


module.exports = Mentions;
