const Collection = require("../util/Collection");

/**
* Represents a Message Mentions
* @prop {Object} Mentions An object with the message mentions
* @prop {Object} [Mentions]
*/

class Mentions {
	channels = new Collection();
	roles = new Collection();
	users = new Collection();
	everyone = null;
	userReplied = null;

	constructor(message, data = {}) {
		if (data.hasOwnProperty("mention_channels")) {
			for (var channel of data.mention_channels) {
				this.channels.set(
					channel.id,
                    channel
				)
			}
		}

        if (data.hasOwnProperty("mentions")) {
			for (var user of data.mentions) {
				this.users.set(
					user.id,
					user
				)
			}
		}

		if (data.hasOwnProperty("role_mentions")) {
			for (const role of data.role_mentios) {
                this.roles(
					role.id,
					role
				)
			}
		}

		if (data.hasOwnProperty("mention_everyone")) {
			 this.everyone = data.mention_everyone;
		}

		if (data.hasOwnProperty("referenced_message")) {
			this.userReplied = message.client.users.get(data.referenced_message.author?.id);
		}
	}
}


module.exports = Mentions;