const EventEmmiter = require("node:events");
const WebSocket = require("../gateway/WebSocket");
const REST = require("../rest/RequestHandler");
const Collection = require("../util/Collection");
const Base = require("../structures/Base");
const User = require("../structures/User");
const Message = require("../structures/Message");
const GatewayIntentBits = require("../helpers/GatewayIntentBits");
const { Routes } = require("../rest/Endpoints");
const { GatewayIntents } = require("../util/Gateway");


/**
 * Represents a sunsire Client
 * @extends EventEmmiter
 * @prop {REST} rest The request handler the client will use
 * @prop {WebSocket} ws The client WebSocket manager
 * @prop {Collection} guilds Collection of guilds the client is in
 * @prop {Collection} channels Collection of channels the client has access to
 * @prop {Collection} users Collection of the users the bot sees
 * @prop {Application} application The client application
 * @prop {User} user The client user
 * @prop {Number} startTimestamp Timestamp when the client was started
 * @prop {Number} uptime Uptime since client started 
 */

class Client extends EventEmmiter {
    /**
     * Create the client
     * @arg {string} token The client token for use
     * @arg {object} [options] The options for the client
     * @arg {string|number} [options.intents] The intents for this client, default is all of non-privileged intents
     * @arg {object} [options.disabledEvents=[]] An array with the client disabled events
     * @arg {object|string} [options.shards=auto] An array of shards for the client, default is 'auto' which uses the amount of shards recommended by Discord
     * @arg {number} [options.firstShardID=0] The ID of the first shard to run for this client
     * @arg {boolean} [options.compress=false] Whether to request WebSocket data to be compressed or not
     * @arg {number} [options.connectionTimeout=30000] How long in milliseconds to wait for the connection to handshake with the server
     * @arg {boolean} [options.reconnect=true] Whether WebSocket should be reconnected again after close
     */
    constructor(token, options = {}) {
        super();

        this.options = Object.assign({
            intents: GatewayIntents.allNonPrivileged,
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
                } else if (GatewayIntents[intent]) {
                    bitmask |= GatewayIntents[intent];
                } else {
                    console.warn(`Unknown intent: ${intent}`);
                }
            }

            this.options.intents = new GatewayIntentBits(bitmask);
        }

        if (this.options.shards !== "auto" && Array.isArray(this.options.shards) === false) {
            this.options.shards = "auto";
        } 

        this.options.shardCount = typeof(this.options.shards) == "object" ? this.options.shards.length : 'auto';

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
        return (Date.now() - this.startTimestamp) ?? void 0;
    }

    /**
     * Send a message to a channel
     * @returns {Promise<Object>} Returns a promise with the message object
     * @prop {String} channelId The ID of the guild channel
     * @prop {Object} body Body of the message
     * @prop {String} [body.content] Content of the message
     * @prop {Object} [body.embeds] An object with the embed
     */
    createMessage(channelId, body) {
        if (!this.token) throw new Error("Client token not provided");

        return new Promise(async (resolve, reject) => {
            if (!channelId || !body) return reject(`Missing channelId and body`);

            const data = await this.rest.post(Routes.channelMessages(channelId), body);

            return resolve(new Message(data));
        }) 
    }

    /**
     * Destroy the client
     */
    destroy() {
        if (!this.ws || this.ws.destroyed) return;

        this.rest.setToken(null);
        this.ws.destroy();
    }
}


module.exports = Client;
