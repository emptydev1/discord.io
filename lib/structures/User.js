const Base = require("./Base");
const UserFlagsBits = require("../helpers/UserFlagsBits");
const createdTimestamp = require("../helpers/createdTimestamp");
const { CDNRoutes } = require("../rest/Endpoints");

/**
 * Represents a Discord User
 * @extends Base
 * @prop {String} id The ID of the user
 * @prop {Boolean} bot Whether the user is an OAuth bot or not
 * @prop {Boolean} system Whether the user is an official Discord system user (e.g. urgent messages)
 * @prop {UserFlags} flags Publicly visible flags for this user
 * @prop {String} username The username of the user
 * @prop {String} discriminator The discriminator of the user
 * @prop {String} avatar The hash of the user's avatar, or null if no avatar
 * @prop {String} banner The hash of the user's banner, or null if no banner
 * @prop {String} accentColor The user's banner color, or null if no banner color
 * @prop {Boolean} verified Whether or not this acconut has been verified (client user only)
 * @prop {Boolean} mfaEnabled If the bot's has MFA enabled on their account (client user only)
 */


class User extends Base {
    constructor(client, data) {
        super(client, data);

        this._patch(data);
    }


    _patch(data) {
        this.id = data.id;

        if ('username' in data) {
            this.username = data.username;
        } else {
            this.username ??= null;
        }

        if ('discriminator' in data) {
            this.discriminator = data.discriminator;
        } else {
            this.discriminator ??= null;
        }

        if ('avatar' in data) {
            this.avatar = data.avatar;
        } else {
            this.avatar ??= null;
        }

        if ('banner' in data) {
            this.banner = data.banner;
        } else {
            this.banner = undefined;
        }

        if ('accent_color' in data) {
            this.accentColor = data.accent_color;
        } else {
            this.accentColor = undefined;
        }

        this.bot = null;
        this.system = null;
        this.flags = null;
        this.mfaEnabled = void 0;
        this.verified = void 0;

        if ('bot' in data) {
            this.bot = Boolean(data.bot);
        } else if (!this.partial && typeof(this.bot) !== 'boolean') {
            this.bot ??= false;
        }

        if ('system' in data) {
            this.system = Boolean(data.system);
        } else if (!this.partial && typeof(this.system) !== 'boolean') {
            this.system ??= false;
        }

        if ('flags' in data) {
            this.flags = new UserFlagsBits(data.flags);
        }

        if ('verified' in data) {
            this.verified = data.verified;
        }

        if ('mfa_enabled' in data) {
            this.mfaEnabled = data.mfa_enabled;
        }
    }

    /**
     * Get the created timestamp of this user
     * @readonly
     */
    get createdTimestamp() {
        return createdTimestamp(this.id) ?? void 0;
    }

    /**
     * Get the creation date of this user
     * @readonly
     */
    get creationDate() {
        return new Date(this.createdTimestamp) ?? void 0;
    }

    /**
     * Get the tag of this user
     * @readonly
     */
    get tag() {
        if (!this.username || !this.discriminator) return void 0;
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * Whether this user's is an partial
     * @readonly
     */
    get partial() {
        return typeof(this.username) !== "string";
    }

    /**
     * Get the user's avatar URL 
     * @param {URLOptions} options The options of the URL
     * @returns {String}
     */
    avatarURL(options) {
        if (!this.avatar) return null;

        return CDNRoutes.userAvatar(this.id, this.avatar, options);
    }

    /**
     * Get the user's banner URL 
     * @param {URLOptions} options The options of the URL
     * @returns {String}
     */
    bannerURL(options) {
        if (!this.banner) return null;

        return CDNRoutes.banner(this.id, this.banner, options);
    }

    /**
     * Get the user's default avatar URL
     * @readonly
     */
    get defaultAvatarURL() {
        return CDNRoutes.defaultAvatarURL(this.defaultAvatar);
    }

    /**
     * The user's default avatar
     * @readonly
     */
    get defaultAvatar() {
        return this.discriminator % 5;
    }
}


module.exports = User;
