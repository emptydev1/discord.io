const Base = require("./Base");
const User = require("./User");

/**
 * Represents a Client Base Application
 * @extends Base
 * @prop {String} id ID of application
 * @prop {String} name The name of application
 * @prop {String} description Description of this application
 * @prop {String} icon The hash of the client application's avatar
 * @prop {Object} tags An array with client tags
 * @prop {Object} installParams The client application install params
 * @prop {Boolean} botPublic Whether the client is a public or private bot
 * @prop {Boolean} botRequireCodeGrant Whether the client require a code grant
 * @prop {Number?} flags The client application flags
 * @prop {Object} owner The client application's owner
*/

class BaseApplication extends Base {
    constructor(client, data) {
        super(client, data);

        this._patch(data);
    }


    _patch(data) {
        if ('id' in data) {
            this.id = data.id
        } else {
            this.id ??= null;
        }


        if ('name' in data) {
            this.name = data.name;
        } else {
            this.name ??= null;
        }


        if ('description' in data) {
            this.description = data.description;
        } else {
            this.description ??= null;
        }


        if ('icon' in data) {
            this.icon = data.icon;
        } else {
            this.icon ??= null;
        }


        if ('tags' in data) {
            this.tags = data.tags;
        } else {
            this.tags ??= [];
        }


        if ('install_params' in data) {
            this.installParams = data.install_params;
        } else {
            this.installParams ??= null;
        }


        if ('bot_public' in data) {
            this.botPublic = data.bot_public;
        } else {
            this.botPublic ??= null;
        }


        if ('bot_require_code_grant' in data) {
            this.botRequireCodeGrant = data.bot_require_code_grant;
        } else {
            this.botRequireCodeGrant ??= null;
        }


        if ('flags' in data) {
            this.flags = data.flags;
        } else {
            this.flags ??= null;
        }


        if ('owner' in data) {
            this.owner = new User(data.owner);
        } else {
            this.owner ??= null;
        }
    }
}


module.exports = BaseApplication;
