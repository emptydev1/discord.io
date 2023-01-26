const Collection = require("../util/Collection");
const User = require("./User");

/**
 * Represents a Discord Message mentions
 * @extends Collection
 * @prop {Collection}
 */

class Mentions {
    constructor(client, data = {}) {
        this.users = new Collection();
        this.channels = new Collection();
        this.roles = new Collection();
        This.everyone = false;
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

        if ('referenced_message' in data) this.replyTo = new User(data.referenced_message.author);
        
        if (data?.mention_everyone) this.everyone = data.mention_everyone;
    }
}


module.exports = Mentions;
