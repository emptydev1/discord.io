const { Routes } = require("../rest/Endpoints");
const User = require("./User");

/**
 * Represents logged client's Discord user
 * @extends User
 * @prop {Boolean} verified Whether or not this acconut has been verified
 * @prop {Boolean} mfaEnabled If the bot's has MFA enabled on their account
 */


class ClientUser extends User {
    constructor(client, data) {
        super(client, data);
        super._patch(data);
        this._patch(data);
    }


    _patch(data) {
        if ('verified' in data) {
            this.verified = data.verified;
        }

        if ('mfa_enabled' in data) {
            this.mfaEnabled = data.mfa_enabled;
        } else {
            this.mfaEnabled ??= null;
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
        return this.edit({
            username
        });
    }

    setAvatar(avatar) {
        return this.edit({
            avatar
        });
    }
}


module.exports = ClientUser;
