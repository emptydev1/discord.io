const WebSocket = require("ws");
const EventEmmiter = require("node:events");
const { GatewayOPCodes, GatewayDispatchEvents } = require("../util/Gateway");
const { identify } = require("../util/Constants");
const Status = require("../util/Status");
const PacketHandlers = require("./handlers");


/** 
 * Represents a shard 
 * @extends EventEmitter 
 * @prop {Number} id The ID of the shard
 * @prop {Boolean} connecting Whether the shard is connecting 
 * @prop {Boolean} ready Whether the shard is ready
 * @prop {Number} ping The current latency between the shard and Discord, in milliseconds
 * @prop {Boolean} lastHeatbeatAck Wether the shard has already been acknowledged 
 * @prop {Number?} lastHeartbeatReceived Last time Discord acknowledged a heartbeat, null if shard has not sent heartbeat yet 
 * @prop {Number?} lastHeartbeatSent Last time shard sent a heartbeat, null if shard has not sent heartbeat yet 
 * @prop {Number} status The status of the shard.
 * @prop {String?} sessionId The shard session ID
 * @prop {Number} connectionAttemps Number of connection attempts between the shard and Discord
 * @prop {Number} seq The shard sequence
 * @prop {String} resumeURL The shard resume URL
 */

class Shard extends EventEmmiter {
    constructor(id, _manager) {
        super();

        this.id = id;

        /**
         * Defines a client manager
         * @type {Object}
         * @private
         */
        Object.defineProperty(this, '_manager', {
            value: _manager
        })

        /**
         * Defines a Client
         * @type {Object}
         * @private
         */
        Object.defineProperty(this, 'client', {
            value: this._manager.client
        })

        /**
         * Defines a client token
         * @type {String}
         * @private
         */
        Object.defineProperty(this, '_token', {
            value: this.client.token
        });

        /**
         * Defines this WebSocket connection
         */
        Object.defineProperty(this, 'ws', {
            value: null,
            writable: true
        })


        this.superReset();
    }


    connect() {
        if (!this._token) {
            this.destroy(
                null,
                new Error(`The client token not provided`)
            );

            return;
        }

        if (this.ws && this.ws?.readyState != WebSocket.CLOSED) {
            this.emit("error", new Error("[EXISTENT_CONNECTION] An existing connection was detected"), this.id);
            return;
        }

        this.connecting = true;
        this.connectionAttemps++;

        this.initialize();
    }

    initialize() {
        this.status = Status.Connecting;
        this.ws = new WebSocket(this._manager.gateway, this.client.ws ?? {});


        this.ws.on("open", () => this.onOpen());
        this.ws.on("message", payload => this.onMessage(payload));
        this.ws.on("close", (code, reason) => this.onClose(code, reason));
        this.ws.on("error", err => this.onError(err));

    }

    destroy(options = {}, reason) {
        if (!this.ws) return;

        if (this.ws.readyState !== WebSocket.CLOSED) {
            this.ws.removeListener("message", this.onMessage);
            this.ws.removeListener("close", this.onClose);


            try {
                if (options?.reconnect && this.sessionId) {

                    if (this.ws.readyState === WebSocket.OPEN) {
                        this.ws.close(4_901, "Reconnect");
                    } else {
                        this.debug(`[TERMINATE] Shard session has been teminated`);

                        this.ws.terminate();
                    }
                } else {
                    this.ws.close(1_000, "normal");
                }
            } catch (err) {
                this.emit("error", err);
            }
        }


        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }


        this.ws = null;
        this.reset();


        /**
         * Reaction by which the shard is being disconnected 
         * @event Shard#disconnect
         * @prop {Error?} reason Reason why the shard was destroyed
         */
        this.emit("disconnect", reason);


        if (options?.reconnect == 'auto' && this.client.options.reconnect) {

            if (this.sessionId) {
                this.debug(`[RECONNECT] Reconnecting shard. . .`)

                this.connect();
            } else {
                this.debug(`[RECONNECT] The shard will reconnect in ${this.reconnectInterval}ms. . .`)

                this.reconnectTimeout = setTimeout(() => {
                    this.connect();
                }, this.reconnectInterval);
            }
        } else {
            this.superReset();
        }
    }

    debug(message) {
        this._manager.debug(
            `[WebSocketShard => ${this.id}] ` + 
             message,
             this
        );
    }

    identify() {
        if (!this.ws) return;

        const Identify = {
            token: this._token,
            v: this.client.rest.version,
            properties: {
                "os": process.platform,
                "browser": identify,
                "device":  identify
            }
        }

        this.debug(`[IDENTIFY] Shard is being identified...`)

        this.status = Status.Identifying;
        this.sendWebSocket(GatewayOPCodes.Identify, Identify);
    }

    resume() {
        this.debug(`[RESUME] Resuming session ${this.sessionId}`)

        this.status = Status.Resuming;

        this.sendWebSocket(GatewayOPCodes.Resume, {
            token: this._token,
            session_id: this.session_id,
            seq: this.seq
        })
    }

    sendWebSocket(op, _data) {
        if (this.ws && this.ws.readyState == WebSocket.OPEN) {
            const data = JSON.stringify({
                op,
                d: _data
            });

            this.ws.send(data);
        }
    }

    onOpen() {
        this.status = Status.Handshaking;

        /**
         * Emitted when the shard stabilizes its connection 
         * @event Client#connect
         * @type {Number} The ID of shard
         */
        this.client.emit("connect", this.id);

        this.debug(`[CONNECTED] Shard has successfully connected to the gateway`)
        this.lastHeartbeatAck = true;
    }

    onMessage(packet) {
        packet = JSON.parse(String(packet));
        this.onPacket(packet);
    }

    onPacket(packet) {
        /**
         * Emitted when receiving a WebSocket message 
         * @event Client#raw
         * @prop {Object} packet The packet
         * @prop {Number} id The ID of this shard
         */
        this.client.emit("raw", packet, this.id);


        if (packet.s > this.seq) this.seq = packet.s;


        switch (packet.t) {
            case GatewayDispatchEvents.Ready: {
                /**
                 * Emitted when the shard is ready 
                 * @event Shard#ready
                 */
                this.emit("ready");

                this.sessionId = packet.d.session_id;
                this.resumeURL = packet.d.resume_gateway_url;
                this.expectedGuilds = new Set(packet.d.guilds.map(d => d.id));
                this.status = Status.WaitForGuilds;
                this.debug(`[READY] Session ${this.sessionId}`);
                this.lastHeartbeatAck = true;
                this.heartbeat();
                break;
            }
        }

        switch (packet.op) {
            case GatewayOPCodes.Dispatch: {
                if (this.client.options.disabledEvents[packet.t]) return;

                if (packet && PacketHandlers[packet.t]) {
                    PacketHandlers[packet.t](this.client, packet, this);
                }
                break;
            }
            case GatewayOPCodes.Heartbeat: {
                this.heartbeat();
                break;
            }
            case GatewayOPCodes.InvalidSession: {
                this.debug(`[INVALID_SESSION] Invalid session, re-identifying`)

                this.seq = 0;
                this.sessionId = null;
                this.identify();
                break;
            }
            case GatewayOPCodes.Reconnect: {
                this.debug(`[RECONNECT] Reconnecting the shard...`);
                this.destroy({
                    reconnect: true
                });
                break;
            }
            case GatewayOPCodes.Hello: {
                if (packet.d.heartbeat_interval) {
                    if (this.heartbeatInterval) {
                        clearInterval(this.heartbeatInterval);
                    }

                    this.heartbeatInterval = setInterval(() => this.heartbeat(true), packet.d.heartbeat_interval);

                    this.debug(`Heartbeat interval set to ${packet.d.heartbeat_interval}ms`)
                }

                this._trace = packet.d._trace ?? null;
                this.connecting = false;

                if (this.sessionId) {
                    this.resume();
                } else {
                    this.identify();

                    this.heartbeat();
                }
                break;
            }
            case GatewayOPCodes.HeartbeatAck: {
                this.lastHeartbeatAck = true;
                this.lastHeartbeatReceived = Date.now();
                this.ping = this.lastHeartbeatReceived - this.lastHeartbeatSent;
                this.debug(`Heartbeat Acknowledged, latency of this shard is ${this.ping}ms`)
            }
        }
    }

    superReset() {
        this.reset();

        this.sessionId = null;
        this.ws = null;
        this.heartbeatInterval = null;
        this.connectionAttemps = 0;
        this.reconnectInterval = 1000;
        this.seq = -1;
    }

    reset() {
        this.connecting = false;
        this.ready = false;
        this.ping = -1;
        this.lastHeartbeatAck = true;
        this.lastHeartbeatReceived = null;
        this.lastHeartbeatSent = null;
        this.status = Status.Disconnect;
    }

    onError(err) {
        this.emit("error", err);
    }

    onClose(code, reason) {
        reason = String(reason);

        this.emit("close", {
            code,
            reason
        });
    }

    heartbeat(ignoreHeartbeatAck = false) {
        if (this.status == "resuming" || this.status == "identifying") return;

        if (!this.lastHeartbeatAck) {

            this.debug(`No heartbeat acknowledgment received, so assumed connection zombied, destroying and reconnecting.`);

            return this.destroy({
                reconnect: 'auto'
            });
        }

        this.debug(`[HeartbeatTimer] Sending a heartbeat`);
        this.lastHeartbeatSent = Date.now();
        this.lastHeartbeatAck = false;
        this.sendWebSocket(GatewayOPCodes.Heartbeat, this.seq);
    }

    checkReady() {
        this.status = Status.Ready;
        this.ready = true;
    }
}


module.exports = Shard;
