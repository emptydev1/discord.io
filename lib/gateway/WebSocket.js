const process = require("node:process");
const EventEmmiter = require("node:events");
const WS = require("ws");
const Collection = require("../util/Collection");
const PacketHandlers = require("./handlers");
const { Routes } = require("../rest/Endpoints");
const { identify } = require("../util/Constants");
const { GatewayOPCodes } = require("../util/Gateway");
const Events = require("../util/Events");
const Shard = require("./Shard");

/**
 * Represents a client WebSocket manager
 * @extends EventEmmiter
 * @prop {String?} gateway The gateway URL provided by Discord
 * @prop {Number} shardCount Number of total shards the client owns 
 * @prop {Collection} shards An collection with the client shards
 * @prop {Boolean} destroyed Wether this WebSocket is destroyed
 */

class WebSocket extends EventEmmiter {
    constructor(client) {
        super();

        this.gateway = null;
        this.shardCount = client.options.shards.length;
        this.shards = new Collection();
        this.destroyed = false;

        /**
         * Defines a client
         * @type {Object}
         * @private
         */
        Object.defineProperty(this, 'client', {
            value: client
        });

        /**
        * A set of shards in the queue
        * @type {Set}
        * @private
        */
        Object.defineProperty(this, 'shardQueue', {
            value: new Set(),
            writable: true
        });
    }


    /**
     * Connect the client to gateway
     * @private
     */
    async connect() {
        const { 
            url,
            shards: RecommendedShards, 
            session_start_limit
        } = await this.client.rest.get(Routes.gatewayBot()); // Get the bot gateway information;

        this.debug(
            `| Gateway Information\n` +
            `| URL: ${url}/\n` +
            `| Recommended Shards: ${RecommendedShards}\n`
        )

        this.gateway = `${url}/`;

        const { total, remaining } = session_start_limit;

        this.debug(
            "| Session Start Limit Information\n" +
            `| Total: ${total}\n` +
            `| Remaining: ${remaining}\n`
        )


        var { shards } = this.client.options;


        if (shards === 'auto') {
            shards = this.client.options.shards = Array.from({
                    length: RecommendedShards,
                }, (a, b) => b);

            this.shardCount = this.client.options.shardCount = RecommendedShards;

            this.debug(`Using the recommended amount of shards provided by Discord: ${RecommendedShards}`);
        }

        this.shardQueue = new Set(shards.map(shard => new Shard(shard, this)));

        this.debug(`Initializing shards: `, shards.join(", "))

        this.spawnShards();
    }

    /**
    * Emits the 'debug' event
    * @param {String?} message The debug message to emit
    * @param {Number} shard The ID of the shard
    * @private
    */
    debug(message, shard) {
        this.client.emit(Events.Debug, message, shard);
    }

    /**
    * Spawn the client shards
    * @private
    */
    spawnShards() {
        for (const shard of this.shardQueue) {
            this.shardQueue.delete(shard);

            try {
                shard.connect();
                this.shards.set(shard.id, shard);

                shard.on("ready", () => {
                    /**
                    * Emitted when shard is ready
                    * @event Client#shardReady
                    * @prop {Number} id The ID of the shard that is ready
                    */

                    this.client.emit(Events.ShardReady, shard.id);
                }).on("error", err => {
                    /**
                    * Emitted when an error occurs in the execution of the shard
                    * @event Client#shardError
                    * @prop {String?} err The error that occurred while running the shard
                    * @prop {Number} id The ID of the shard that is occurred an error 
                    */

                    this.client.emit(Events.ShardError, err, shard.id);
                }).on("close", d => {
                    /**
                    * Emitted when the shard is closed 
                    * @event Client#shardClose
                    * @prop {Number?} code The close code 
                    * @prop {Number} id The ID of the shard that is closed
                    */

                    this.client.emit(Events.ShardClose, d.code, shard.id);
                }).on("disconnect", reason => {
                     /**
                     * Emitted when the shard is disconnected 
                     * @event Client#shardDisconnect
                     * @prop {String?} reason Reason why the shard was disconnected
                     * @prop {Number} id The ID of tbe shard that is disconnected
                     */

                     this.client.emit(Events.ShardDisconnect, reason, shard.id);
                })
            } catch (error) {
                this.debug(`[WebSocketShard => ${shard.id}] An error occurred while connecting this shard;\n` + error);
                throw error;
            }
        }

        if (this.destroyed) this.destroyed = false;
    }

    /**
    * Destroy this WebSocket
    * @private
    */
    destroy() {
        for (const shard of Array.from(this.shards.values())) shard.destroy();
        this.shardQueue.clear();
        this.destroyed = true;
    }

    /**
    * Get the latency of the WebSocket
    * @readonly
    */
    get ping() {
        return (this.shards.reduce((a, b) => a + b.ping, 0)) / this.shards.size;
    }
}


module.exports = WebSocket;
