const EventEmmiter = require("node:events");
const WebSocket = require("../gateway/WebSocket");
const REST = require("../rest/RequestHandler");
const Collection = require("../util/Collection");
const { Routes } = require("../rest/Endpoints");
const { GatewayIntentBits } = require("../util/Gateway");
const Base = require("../structures/Base");
const User = require("../structures/User");
const Message = require("../structures/Message");


/**
 * Represents a sunsire Client
 * @extends EventEmmiter
 * @prop {RequestHandler} rest The request handler the client will use
 * @prop {Object} ws The client WebSocket manager
 * @prop {Collection<Guild>} guilds Collection of guilds the client is in
 * @prop {Collection<ChanneL>} channels Collection of channels the client has access to
 * @prop {Collection<User>} users Collection of the users the bot sees
 * @prop {ClientApplication} application The application object
 * @prop {ClientUser} user The client user
 * @prop {Number} startTime Timestamp when the client was started
 * @prop {Number} uptime Client uptime
 */

class Client extends EventEmmiter {
    /**
     * Create a client
     * @arg {String} token The Discord bot to use.
     * @arg {Object} options Options for the client
     * @arg {Number | Array<String|Number>} [options.intents] A list of [intent names](/Eris/docs/reference), pre-shifted intent numbers to add, or a raw bitmask value describing the intents to subscribe to. Some intents, like `guildPresences` and `guildMembers`, must be enabled on your application's page to be used. By default, all non-privileged intents are enabled.
     * @arg {Boolean} [options.reconnect] Reconnect WebSocket on close
     */

    constructor(token, options = {}) {
        super();

        this.options = Object.assign({
            intents: GatewayIntentBits.allNonPrivileged,
            disabledEvents: [],
            reconnect: true,
            shards: "auto"
        }, options)


        if (token && typeof(token) == "string") {
            this.options.token = token;
        } else {
            this.options.token = null;
            throw new Error("Invalid Token");
        }


        if (this.options.hasOwnProperty("intents") && Array.isArray(this.options.intents)) {
            var bitmask = 0;

            for (const intent of this.options.intents) {
                if (typeof(intent) == "number") {
                    bitmask |= intent;
                } else if (GatewayIntentBits[intent]) {
                    bitmask |= GatewayIntentBits[intent];
                } else {
                    console.warn(`Unknown intent: ${intent}`);
                }
            }

            this.options.intents = bitmask;
        }

        if (!Array.isArray(this.options.shards) && this.options.shards != "auto") {
            this.options.shards = "auto";
        }

        this.options.shardCount = typeof(this.options.shards) == "object" ? this.options.shards.length : null;

        this.ws = null;
        this.rest = new REST();
        this.guilds = new Collection();
        this.channels = new Collection();
        this.users = new Collection();
        this.application = null;
        this.user = null;
        this.startTimestamp = null;
    }


    /**
     * Connect the client to Discord gateway
     * @returns {Promise<String>} Returns the token used
     */
    async connect() {
        this.rest.setToken(this.token);
        this.ws = new WebSocket(this);


        try {
            this.ws.connect();
            return this.token;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the client token
     * @type {String}
     */
    get token() {
        return this.options.token;
    }

    /**
     * Client uptime timestamp 
     * @type {Number}
     */
    get uptime() {
        return (Date.now() - this.startTimestamp) ?? null;
    }

    /**
     * Send a message to a channel
     * @returns {Promise<Object>} Returns a promise with the message object
     * @prop {String} channelId The ID of the guild channel
     * @prop {Object} body Body of the message
     * @prop {String} [body.content] Content of the message
     * @prop {Object} [body.embeds] An object with the embed
     */
    async createMessage(channelId, body) {
        if (!channelId && !body) return;
        if (typeof(body) !== "object" || Array.isArray(body)) return;


        return await this.rest.post(Routes.channelMessages(channelId), body)
            .then(message => new Message(message, this));
    }
}


module.exports = Client;
