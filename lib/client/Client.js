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
 * @prop {Collection} guilds Collection of guilds the client is in
 * @prop {Collection} channels Collection of channels the client has access to
 * @prop {Collection} users Collection of the users the bot sees
 * @prop {ClientApplication} application The client application
 * @prop {ClientUser} user The client user
 * @prop {Number} startTimestamp Timestamp when the client was started
 * @prop {Number} uptime Uptime since client started 
 */

class Client extends EventEmmiter {
    /**
     * Create the client
     * @prop {string} token The client token for use
     * @prop {object} [options] The options for the client
     * @prop {string|number} [options.intents] The intents for this client, default is all of non-privileged intents
     * @prop {object} [options.disabledEvents] An array with the client disabled events
     * @prop {boolean} [options.reconnect] Whether WebSocket should be reconnected again after close
     * @prop {?object|string} [options.shards] An array of shards for the client, default is 'auto' which uses the amount of shards recommended by Discord
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
