const User = require("./User");
const {Routes} = require("../rest/Endpoints");

/*
* Represents a Client User
* @extends User
*
* @prop {String} id The ID of the user
* @prop {Boolean} bot Whether the user is an OAuth bot or not
* @prop {Boolean} system Whether the user is an official Discord system user (e.g. urgent messages)
* @prop {Number?} flags Publicly visible flags for this user
* @prop {String} username The username of the user
* @prop {String} discriminator The discriminator of the user
* @prop {String} avatar The hash of the user's avatar, or null if no avatar
* @prop {String} accentColor The user's banner color, or null if no banner color
* @prop {Boolean} verified 
* @prop {Boolean} mfaEnabled
* @prop {Number?} createdAt Timstamp of the user's creation date
* @prop {String} tag The tag of the user
* @prop {String} avatarURL The URL of the user's avatar
* @prop {String} bannerURL The URL of the user's banner
* @prop {String} defaultAvatarURL The default avatar URL of the user
* @prop {Number?} defaultAvatar The default avatar of the user
*/


class ClientUser extends User {
	constructor(data, client) {
		super(data, client);

		this._patch(data);
	}
	
	_patch(data) {
		if ('verified' in data) {
	    	/**
		    * Whether or not this acconut has been verified
            * @type {Boolean}
		    */
			
			this.verified = data.verified;
		}

		if ('mfa_enabled' in data) {
            /**
			* If the bot's has MFA enabled on their account 
            * @type {?boolean} 
            */

			this.mfaEnabled = typeof(data.mfa_enabled) == "boolean" ? data.mfa_enabled : null;
		} else {
			this.mfaEnabled = null;
		}
	}

	async edit(options = {}) {
		const data = await this.client.rest.patch(Routes.user(), options);
		const token = data.token || this.client.options.token;
		
		this.client.options.token = token;
		this.client.rest.setToken(token);

		return data;
	}

	setUsername(username) {
		return this.edit({ username });
	}

	setAvatar(avatar) {
		return this.edit({ avatar });
	}
}


module.exports = ClientUser;