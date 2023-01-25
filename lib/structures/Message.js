const Base = require("./Base");
const User = require("./User");
const ClientApplication = require("./ClientApplication");
const Mentions = require("./MessageMentions");
const { Routes } = require("../rest/Endpoints");

/**
 * Represents a Guild Text message
 * @extends Base
 * @prop {String} id The ID of the message
 * @prop {String} type Type of the message
 * @prop {String} channelId A ID of the channel used to sent message
 * @prop {Object} author The message author
 * @prop {?String} content Content of the message
 * @prop {Object} attachments An object with the message attachments
 * @prop {Object} embeds An object with the message embeds
 * @prop {Object} components An object with the message components
 * @prop {Object} mentions An object with the message mentions
 * @prop {Boolean} pinned Whether the message is pinned or not
 * @prop {Boolean} tss If the message is an tss message or not
 * @prop {?Object} messageReference Returns an object with the reference message
 * @prop {Number} createdTimestamp A timestamp of the message creation date
 * @prop {Number} flags The message flags
 */

class Message extends Base {
    constructor(client, data) {
        super(client);

        this._patch(data);
    }

    _patch(data) {
        this.id = data.id;

        if ('type' in data) {
            this.type = data.type;
        } else {
            this.type ??= null;
        }

        
    }

    reply(body = {}) {
        if (!('message_reference' in body) && (typeof(body.message_reference) !== 'object')) {
            body.message_reference = {
                message_id: this.messageId,
                channel_id: this.channelId,
                guild_id: this.guildId
            }
        }

        return this.client.createMessage(this.channelId, body);
    }

    async delete() {
        return await this.client.rest.delete(Routes.channelMessage(this.id));
    }
}


module.exports = Message;
