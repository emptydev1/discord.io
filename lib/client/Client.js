const EventEmmiter = require("node:events");
const RequestHandler = require("../rest/RequestHandler");
const WebSocket = require("../gateway/WebSocket");
const Collection = require("../util/Collection");
const Base = require("../structures/Base");
const User = require("../structures/User");
const Message = require("../structures/Message");
const GatewayIntentBits = require("../helpers/GatewayIntentBits");
const { fetch } = require("undici");
const { Routes } = require("../rest/Endpoints");
const { GatewayIntents } = require("../util/Gateway");
var ZlibSync;
try {
    ZlibSync = require("zlib-sync");
} catch(err) {} // eslint-disable no-empty

/**
 * Represents a discord.js client
 * @prop {?WebSocket} ws The client's WebSocket manager 
 * @prop {REST} rest The client request handler
 * @prop {Collection} guilds A collection of client guilds 
 * @prop {Collection} channels A collection of client channels
 * @prop {Collection} users A collection of client users
 * @prop {?Application} application The client application's 
 * @prop {?User} user The client user's
 * @prop {?Number} startTimestamp The client ready timestamp
 * @prop {Function} run Connect this client to Discord gateway
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
        this.run = this.run.bind(this);
    }


    /**
     * Connect this client to Discord gateway
     * @returns {Promise<String>} Returns the token used if the client is successfully connected to the gateway 
     */
    async run() {
        this.rest.setToken(this.token);
        this.ws = new WebSocket(this);


        try {
            this.ws.connect();
            return this.token;
        } catch (error) {
            throw new Error(error);
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
     * @arg {String} [data.content] Message contents (up to 2000 characters)
     * @arg {String | Intenger} [data.nonce] Can only be used to verify message was sent.
     * @arg {Boolean] [data.tss] 'true' if this is a tss message
     * @arg {Array<Object>} [data.embeds] An array with the message embeds
     * @arg {Object} [data.allowedMentions] An object with the message allowed mentions
     * @arg {Array} [data.allowedMentions.parse] Areay of allowed mention types to parse from the content
     * @arg {Array<Snowflake>} [data.allowedMentions.roles] Array of role ID's to mention, maxium are 100
     * @arg {Array<Snowflake>} [data.allowedMentions.users] Array of user's ID's to mention, maxium are 100
     * @arg {Boolean} [data.allowedMentions.replied_user=false] Whether to mention the author of the message that was replied to 
     * @arg {Object} [data.message_reference] An object with the message that must be answered
     * @arg {Snowflake} [data.message_reference.message_id] The ID of the message that should be replied to
     * @arg {Snowflake} [data.message_reference.channel_id] The ID of the message source channel 
     * @arg {Snowflake} [data.message_reference.guild_id] The message's referral guild ID 
     * @arg {Boolean} [data.message_reference.fail_if_not_exists=true] when sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message
     * @arg {Array<Object>} [data.components] An array with the message components, to see more about it see [the oficial discord API](https://discord.com/developers/docs/interactions/message-components#component-object) to view more of message components
     * @arg {Array<Snowflake>} [data.sticker_ids] IDs of up to 3 stickers in the server to send in the message
     * @arg {Array<Object>} [data.files] Content of the file being sent, See [Uploading files](https://discord.com/developers/docs/reference#uploading-files)
     * @arg {String} [data.payload_json] JSON-encoded body of non-file params, only for multipart/form-data requests. See [Uploading Files](https://discord.com/developers/docs/reference#uploading-files)
     * @arg {Array<Object>} [data.attachments] Attachment objects with filename and description. See [Uploading Files](https://discord.com/developers/docs/reference#uploading-files)
     * @arg {Intenger} [data.flags] Message flags combined as a bitfield (only SUPPRESS_EMBEDS can be set)
     */
    createMessage(channelId, data) {
        if (!this.token) throw new Error("Client token not set");
        if (!channelId || !data) throw new TypeError("Missing channel ID and body");

        return new Promise(async (resolve, reject) => {
            var body = {};

            if (typeof(data) === "string") {
                body.content = data;
            } else if (typeof(data) === "object" && !Array.isArray(data) && !(data instanceof Map)) {
                body = data;
            } else {
                reject("The body is inavlid");
            }

            try {
                const message = await this.rest.post(Routes.channelMessages(channelId), body)
                    .then(msg => new Message(this, msg))

                resolve(message);
            } catch(error) {
                reject(new Error(error));
            }
        })
    }

    /**
     * Destroy the client
     * @returns {undefined}
     */
    destroy() {
        if (!this.ws || this.ws.destroyed) return;

        this.rest.setToken(null);
        this.ws.destroy();
    }

    /**
     * Edit the client user 
     * @param {Object} [options] The options
     * @param {String} [options.username] The new username for client
     * @param {String} [options.avatar] The new avatar image URL for the client
     */
    async edit(options = {}) {
        if (!this.token) throw new TypeError("Missing client token");

        try {
            const data = await this.rest.patch(Routes.user(), options);
            const token = data.token || this.token;

            if (data.token && data.token !== this.token) {
                this.options.token = data.token;
                this.rest.setToken(data.token);
            }

            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Edit client user name 
     * @param {String} username The username to set
     */
    setUsername(username) {
        return this.edit({
            username
        });
    }

    /**
     * Edit client user avatar
     * @param {String} avatar The avatar image URL to set
     */
    async setAvatar(url) {
        if (!url || typeof(url) !== "string") throw new Error("Missing a valid URL");
        
        const req = await fetch(url);
        const base64 = (Buffer.from(await req.arrayBuffer())).toString("base64");
        
        return this.edit({
            avatar: `data:image/jpg;base64,${base64}`
        })
    }
}


module.exports = Client;






