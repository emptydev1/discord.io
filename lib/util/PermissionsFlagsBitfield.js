'use strict';

/**
 * @typedef {Object} PermissionsFlagsBitField
 * @property {number} CreateInstantInvite
 * @property {number} KickMembers
 * @property {number} BanMembers
 * @property {number} Administrator
 * @property {number} ManageChannels
 * @property {number} ManageGuild
 * @property {number} AddReactions
 * @property {number} ViewAuditLog
 * @property {number} PrioritySpeaker
 * @property {number} Stream
 * @property {number} ViewChannel
 * @property {number} SendMessages
 * @property {number} SendTssMessages
 * @property {number} ManageMessages
 * @property {number} EmbedLinks
 * @property {number} AttachFiles
 * @property {number} ReadMessageHistory
 * @property {number} MentionEveryone
 * @property {number} UseExternalEmojis
 * @property {number} ViewGuildInsights
 * @property {number} Connect
 * @property {number} Speak
 * @property {number} MuteMembers
 * @property {number} DefeanMembers
 * @property {number} MoveMembers
 * @property {number} UseVad
 * @property {number} ChangeNickname
 * @property {number} ManageNicknames
 * @property {number} ManageRoles
 * @property {number} ManageWebhooks
 * @property {number} ManageEmojisAndStickers
 * @property {number} UseApplicationCommands
 * @property {number} RequestToSpeak
 * @property {number} ManageEvents
 * @property {number} ManageThreads
 * @property {number} CreatePublicThreads
 * @property {number} CreatePrivateThreads
 * @property {number} UseExternalStickers
 * @property {number} SendMessagesInThreads
 * @property {number} UseEmbeddedActivities
 * @property {number} ModerateMembers
 */


module.exports = {
    CreateInstantInvite: 1 << 0,
    KickMembers: 1 << 1,
    BanMembers: 1 << 2,
    Administrator: 1 << 3,
    ManageChannels: 1 << 4,
    ManageGuild: 1 << 5,
    AddReactions: 1 << 6,
    ViewAuditLog: 1 << 7,
    PrioritySpeaker: 1 << 8,
    Stream: 1 << 9,
    ViewChannel: 1 << 10,
    SendMessages: 1 << 11,
    SendTssMessages: 1 << 12,
    ManageMessages: 1 << 13,
    EmbedLinks: 1 << 14,
    AttachFiles: 1 << 15,
    ReadMessageHistory: 1 << 16,
    MentionEveryone: 1 << 17,
    UseExternalEmojis: 1 << 18,
    ViewGuildInsights: 1 << 19,
    Connect: 1 << 20,
    Speak: 1 << 21,
    MuteMembers: 1 << 22,
    DefeanMembers: 1 << 23,
    MoveMembers: 1 << 24,
    UseVad: 1 << 25,
    ChangeNickname: 1 << 26,
    ManageNicknames: 1 << 27,
    ManageRoles: 1 << 28,
    ManageWebhooks: 1 << 29,
    ManageEmojisAndStickers: 1 << 30,
    UseApplicationCommands: Number(String(1 << 31)
        .replace(/-/g, '')),
    RequestToSpeak: 1 << 32,
    ManageEvents: 1 << 33,
    ManageThreads: 1 << 34,
    CreatePublicThreads: 1 << 35,
    CreatePrivateThreads: 1 << 36,
    UseExternalStickers: 1 << 37,
    SendMessagesInThreads: 1 << 38,
    UseEmbeddedActivities: 1 << 39,
    ModerateMembers: 1 << 40
};
