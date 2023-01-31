const EventEmmiter = require("node:events");
const process = require("node:process");
const RequestHandler = require("../rest/RequestHandler");
const WebSocket = require("../gateway/WebSocket");
const Collection = require("../util/Collection");
const Base = require("../structures/Base");
const User = require("../structures/User");
const Message = require("../structures/Message");
const GatewayIntentBits = require("../helpers/GatewayIntentBits");
const { Routes } = require("../rest/Endpoints");
const { GatewayIntents } = require("../util/Gateway");
var ZlibSync;
try {
    ZlibSync = require("zlib-sync");
} catch(e) {}

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
     * @arg {String} token The client token for use
     * @arg {Object} [options] The options for the client
     * @arg {String | Number} [options.intents] The intents for this client, default is all of non-privileged intents
     * @arg {Object} [options.disabledEvents=[]] An array with the client disabled events
     * @arg {Object | String} [options.shards=auto] An array of shards for the client, default is 'auto' which uses the amount of shards recommended by Discord
     * @arg {Boolean} [options.reconnect=true] Whether WebSocket should be reconnected again after close
     * @arg {Number} [options.shardID=0] The ID of the shard that will be used to start the client 
     * @arg {Boolean} [options.compress=false]  Whether to request WebSocket data to be compressed or not
     * @arg {Number} [options.connectionTimeout=30000] How long in milliseconds to wait for the connection to handshake with the server
     */
    constructor(token, options = {}) {
        super();

        this.options = Object.assign({
            intents: GatewayIntents.allNonPrivileged,
            disabledEvents: [],
            shards: "auto",
            reconnect: true,
            shardID: 0,
            compress: false,
            connectionTimeout: 30000
        }, options)


        if (token && typeof(token) == "string") {
            this.options.token = token;
        } else if('TOKEN' in process.env) {
            this.token = process.env.TOKEN;
        } else {
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

        if (!Array.isArray(this.options.disabledEvents)) this.options.disabledEvents = [];

        if (this.options.shards !== "auto" && Array.isArray(this.options.shards) === false) {
            this.options.shards = "auto";
        } 

        this.options.shardCount = typeof(this.options.shards) == "object" ? this.options.shards.length : 'auto';

        if (this.options.compress && !ZlibSync) {
            this.emit("debug", "Could not find module 'zlib-sync'");
            this.options.compress = false;
        }

        if (typeof(this.options.connectionTimeout) !== "number") this.options.connectionTimeout = 30000;

        this.ws = null;
        this.rest = new RequestHandler();
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
     * @readonly
     */
    get token() {
        return this.options.token;
    }

    /**
     * Client uptime timestamp 
     * @readonly
     */
    get uptime() {
        return (Date.now() - this.startTimestamp) ?? void 0;
    }

    /**
     * Send a message to a channel
     * @remarks If you want to send a message to a user, don't put their ID, but the DM ID between the bot and the user
     * @returns {Promise<Object>} Returns a promise with the message object
     * @arg {String} channelId The ID of the guild channel
     * @arg {Object | String} [data] The body of the message
     * @arg {String} [data.content] A string with the message content
     */
    createMessage(channelId, data) {
        if (!this.token) throw new Error("Client token not set");
        if (!channelId || !data) throw new TypeError("Missing channel ID and body");

        return new Promise(async (resolve, reject) => {
            const body = {};

            if (typeof(data) === "string") {
                body.content = data;
            } else if (typeof(data) === "object" && !Array.isArray(data)) {
                body = data;
            } else {
                return reject("The body is inavlid");
            }

            try {
                const message = await this.rest.post(Routes.channelMessages(channelId), body)
                    .then(msg => new Message(this, msg))

                return resolve(message);
            } catch(error) {
                return reject(new Error(error));
            }
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
