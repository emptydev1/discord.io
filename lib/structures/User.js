const Base = require("./Base");
const {CDNRoutes} = require("../rest/Endpoints");

/**
* Represents a Discord User
* @extends Base
*
* @prop {String} id The ID of the user
* @prop {Boolean} bot Whether the user is an OAuth bot or not
* @prop {Boolean} system Whether the user is an official Discord system user (e.g. urgent messages)
* @prop {Number?} flags Publicly visible flags for this user
* @prop {String} username The username of the user
* @prop {String} discriminator The discriminator of the user
* @prop {String} avatar The hash of the user's avatar, or null if no avatar
* @prop {String} accentColor The user's banner color, or null if no banner color
* @prop {Number?} createdAt Timstamp of the user's creation date
* @prop {String} tag The tag of the user
* @prop {String} avatarURL The URL of the user's avatar
* @prop {String} bannerURL The URL of the user's banner
* @prop {String} defaultAvatarURL The default avatar URL of the user
* @prop {Number?} defaultAvatar The default avatar of the user
*/


class User extends Base {
	constructor(d, client) {
		super(d, client);
		
		this.id = d.id;
		this.bot = d.bot;
		this.system = d.system;
		this.flags = d.public_flags;
		this.username = d.username;
		this.discriminator = d.discriminator;
		this.avatar = d.avatar;
		this.banner = d.banner;
		this.accentColor = d.accent_color;
	}


	_patch(data) {
		if ('bot' in data) {
			/**
			* Whether or not the user an bot
			* @type {boolean}
			*/

			this.bot = typeof(Boolean(data.bot)) == "boolean" ? data.bot : false;
		}

		if ('system' in data) {
			/**
			* Whether the user is an official Discord system user
			* @type {boolean}
			*/

			this.system = typeof(Boolean(data.system)) == "boolean" ? data.system : false;
		}

		if ('public_flags' in data) {
			/**
			* the flags of this user
			* @type {Number?}
			*/

			this.flags = data.public_flags;
		}

		if ('username' in data) {
			/**
			* The username of this user
            * @type {String}
			*/

			this.username = data.username;
		}

		if ('discriminator' in data) {
			/**
			* The discriminator of this user
			* @type {String}
			*/

			this.discriminator = data.discriminator;
		}

		if ('avatar' in data) {
			/**
			* The hash of the user's avatar
			* @type {String}
			*/

			this.avatar = data.avatar;
		}

		if ('banner' in data) {
			/**
			* The hash of the user's banner
			* @type {String}
			*/

			this.banner = data.banner;
		}

		if ('accent_color' in data) {
			/**
			* The base 10 accent color of the user's banner 
			* @type {String}
			*/

			this.accentColor = data.accent_color;
		}
	}


	get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	
	avatarURL(options) {
		if (!this.avatar) return null;
		
		return `${CDNRoutes.userAvatar(this.id, this.avatar, options)}`
	}


	bannerURL(options) {
		if (!this.banner) return null;
		
		return `${CDNRoutes.banner(this.id, this.banner, options)}`;
	}


	get defaultAvatarURL() {
		return `${CDNRoutes.defaultAvatarURL(this.defaultAvatar)}`;
	}


	get defaultAvatar() {
		return this.discriminator % 5;
	}
}


module.exports = User;