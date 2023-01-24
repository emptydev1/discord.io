/**
 * @param {Object} GatewayOPCodes Discord Gateway Operational Codes 
 * @param {Obejct} GatewayDispatchEvents Discord Gateway dispatch events
 * @param {Object} GatewayIntentBits Discord Gateway intents bit field
*/

const GatewayOPCodes = { 
   Dispatch: 0, 
   Heartbeat: 1, 
   Identify: 2, 
   StatusUpdate: 3, 
   VoiceStateUpdate: 4, 
   VoiceGuildPing: 5, 
   Resume: 6, 
   Reconnect: 7, 
   RequestGuildMembers: 8, 
   InvalidSession: 9, 
   Hello: 10, 
   HeartbeatAck: 11 
}

const GatewayDispatchEvents = {
    Ready: "READY"
}

const GatewayIntentBits = {
	guilds:                      1 << 0,
	guildMembers:                1 << 1,
	guildBans:                   1 << 2,
	guildEmojisAndStickers:      1 << 3,
	guildIntegrations:           1 << 4,
	guildWebhooks:               1 << 5,
  guildInvites:                1 << 6,
	guildVoiceStates:            1 << 7,
  guildPresences:              1 << 8,
	guildMessages:               1 << 9,
	guildMessageReactions:       1 << 10,
	guildMessageTyping:          1 << 11,
	directMessages:              1 << 12,
	directMessageReactions:      1 << 13,
	directMessageTyping:         1 << 14,
	messageContent:              1 << 15,
	guildScheduledEvents:        1 << 16,
	autoModerationConfiguration: 1 << 20,
	autoModerationExecution:     1 << 21
};


GatewayIntentBits.allPrivileged = GatewayIntentBits.messageContent 
	| GatewayIntentBits.guildMembers 
	| GatewayIntentBits.guildPresences

GatewayIntentBits.allNonPrivileged = GatewayIntentBits.guilds
    | GatewayIntentBits.guildBans
    | GatewayIntentBits.guildEmojisAndStickers
    | GatewayIntentBits.guildIntegrations
    | GatewayIntentBits.guildWebhooks
    | GatewayIntentBits.guildInvites
    | GatewayIntentBits.guildVoiceStates
    | GatewayIntentBits.guildMessages
	| GatewayIntentBits.guildMessageReactions
    | GatewayIntentBits.guildMessageTyping
    | GatewayIntentBits.directMessages
    | GatewayIntentBits.directMessageReactions
    | GatewayIntentBits.directMessageTyping
    | GatewayIntentBits.guildSheduledEvents
    | GatewayIntentBits.autoModerationConfiguration
    | GatewayIntentBits.autoModerationExecution

GatewayIntentBits.all = GatewayIntentBits.allPrivileged
    | GatewayIntentBits.allNonPrivileged


module.exports = {
    GatewayOPCodes,
    GatewayDispatchEvents,
    GatewayIntentBits
}
