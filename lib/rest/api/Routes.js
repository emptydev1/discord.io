const { RestVersion } = require("../../util/Constants");


module.exports = {
    base_url: "https://discord.com",
    base_path: "/api/v" + RestVersion,

    applicationRoleConnectionMetadata: (applicationId) => `/applications/${applicationId}/role-connections/metadata`,

    guildAuditLog: (guildId) => `/guilds/${guildId}/audit-logs`,

    guildAutoModerationRules: (guildId) => `/guilds/${guildId}/auto-moderation/rules`,
    guildAutoModerationRule: (guildId, ruleId) => `/guilds/${guildId}/auto-moderation/rules/${ruleId}`,

    channel: (channelId) => `/channels/${channelId}`,
    channelMessages: (channelId) => `/channels/${channelId}/messages`,
    channelMessage: (channelId, messageId) => `/channels/${channelId}/messages/${messageId}`,
    channelMessageCrosspost: (channelId, messageId) => `/channels/${channelid}/messages/${messageId}/crosspost`,
    channelMessageOwnReaction: (channelId, messageId, emoji) => `/channels/${channelid}/messages/${messageId}/reactions/${emoji}/@me`,
    channelMessageUserReaction: (channelId, messageId, emoji, userId) => `/channels/${channelid}/messages/${messageId}/reactions/${emoji}/${userId}`,
    channelMessageReaction: (channelId, messageId, emoji) => `/channels/${channelid}/messages/${messageId}/reactions/${emoji}`,
    channelMessageAllReactions: (channelId, messageId) => `/channels/${channelid}/messages/${messageId}/reactions`,
    channelBulkDelete: (channelId) => `/channels/${channelId}/messages/bulk-delete`,
    channelPermission: (channelId, overwriteId) => `/channels/${channelId}/permissions/${overwriteId}`,
    channelInvites: (channelId) => `/channels/${channelId}/invites`,
    channelFollowers: (channelId) => `/channels/${channelId}/followers`,
    channelTyping: (channelId) => `/channels/${channelId}/typing`,
    channelPins: (channelId) => `/channels/${channelId}/pins`,
    channelPin: (channelId, messageId) => `/channels/${channelId}/pins/${messageId}`,
    channelRecipient: (channelId, userId) => `/channels/${channelId}/recipients/${userId}`,
    channelStartThreadWithMessage: (channelId, messageId) => `/channels/${channelId}/messages/${messageId}/threads`,
    channelStartThread: (channelId) => `/channels/${channelId}/threads`,
    channelThreadJoin: (channelId) => `/channels/${channelId}/threads-members/@me`,
    channelThreadAddMember: (channelId, userId) => `/channels/${channelId}/threads-members/${userId}`,
    channelThreadMembersList: (channelId) => `/channels/${channelId}/threads-members`,
    channelPublicThreadList: (channelId) => `/channels/${channelId}/threads/archived/public`,
    channelPrivateThreadList: (channelId) => `/channels/${channelId}/threads/archived/private`,
    channelPrivateThreadsJoinedList: (channelId) => `/channels/${channelId}/users/@me/threads/archived/private`,

    guildEmojis: (guildId) => `/guilds/${guildId}/emojis`,
    guildEmoji: (guildId, emojiId) => `/guilds/${guildId}/emoji/${emojiId}`,
    guilds: () => `/guilds`,
    guild: (guildId) => `/guilds/${guildId}`,
    guildPreview: (guildId) => `/guilds/${guildId}/preview`,
    guildChannels: (guildId) => `/guilds/${guildId}/channels`,
    guildActiveThreads: (guildId) => `/guilds/${guildId}/threads/active`,
    guildMember: (guildId, memberId) => `/guilds/${guildId}/members/${memberId ?? "@me"}`,
    guildMembers: (guildId) => `/guilds/${guildId}/members`,
    guildMembersSearch: (guildId) => `/guilds/${guildId}/members/search`,
    guildMemberRole: (guildId, memberId, roleId) => `/guilds/${guildId}/members/${memberId}/roles/${roleId}`,
    guildBans: (guildId) => `/guilds/${guildId}/bans`,
    guildBan: (guildId, userId) => `/guilds/${guildId}/bans/${userId}`,
    guildRoles: (guildId) => `/guilds/${guildId}/roles`,
    guildRole: (guildId, roleId) => `/guilds/${guildId}/roles/${roleId}`,
    guildMFA: (guildId) => `/guilds/${guildId}/mfa`,
    guildPrune: (guildId) => `/guilds/${guildId}/prune`,
    guildVoiceRegions: (guildId) => `/guilds/${guildId}/regions`,
    guildInvites: (guildId) => `/guilds/${guildId}/invites`,
    guildIntegrations: (guildId) => `/guilds/${guildId}/integrations`,
    guildIntegration: (guildId, integrationId) => `/guilds/${guildId}/integrations/${integrationId}`,
    guildWidgetSettings: (guildId) => `/guilds/${guildId}/widget`,
    guildWidgetJSON: (guildId) => `/guilds/${guildId}/widget.json`,
    guildVanityURL: (guildId) => `/guilds/${guildId}/vanity-url`,
    guildWidgetImage: (guildId) => `/guilds/${guildId}/widget.png`,
    guildWelcomeScreen: (guildId) => `/guilds/${guildId}/welcome-screen`,
    guildVoiceState: (guildId) => `/guilds/${guildId}/voice-states/@me`,

    guildSheduledEvents: (guildId) => `/guilds/${guildId}/sheduled-events`,
    guildSheduledEvent: (guildId, eventId) => `/guilds/${guildId}/sheduled-events/${eventId}`,
    guildSheduledEventUsers: (guildId, eventId) => `/guilds/${guildId}/sheduled-events/${eventId}/users`,

    template: (templateCode) => `/guilds/templates/${templateCode}`,
    guildTemplates: (guildId) => `/guilds/${guildId}/templates`,
    guildTemplate: (guildId, templateCode) => `/guilds/${guildId}/templates/${templateCode}`,

    invite: (inviteCode) => `/invites/${inviteCode}`,

    stageInstances: () => `/stage-instances`,
    stageInstance: (channelId) => `/stage-instances/${channelId}`,

    guildStickers: (guildId) => `/guilds/${guildId}/stickers`,
    guildSticker: (guildId, stickerId) => `/guilds/${guildId}/stickers/${stickerId}`,
    sticker: (stickerId) => `/stickers/${stickerId}`,
    nitroStickerPacks: () => `/sticker-packs`,

    user: (userId) => `/users/${userId ?? "@me"}`,
    userGuilds: () => `/users/@me/guilds`,
    userGuildMember: (guildId) => `/users/@me/guilds/${guildId}/member`,
    userGuild: (guildId) => `/users/@me/guilds/${guildId}`,
    userChannels: () => `/users/@me/channels`,
    userConnections: () => `/users/@me/connections`,
    userApplicationRoleConnection: (applicationId) => `/users/@me/applications/${applicationId}/role-connection`,

    voiceRegions: () => `/voice/regions`,

    channelWebhooks: (channelId) => `/channels/${channelId}/webhooks`,
    guildWebhooks: (guildId) => `/guilds/${guildId}/webhooks`,
    webhook: (webhook) => `/webhooks/${webhook ?? ""}`,

    gateway: () => "/gateway",
    gatewayBot: () => "/gateway/bot",

    oauth2CurrentApplication: () => "/oauth2/applications/@me",
    oauth2CurrentAuthorization: () => "/oauth2/@me"
}
