const BaseApplication = require("./BaseApplication");
const {Routes} = require("../rest/Endpoints");

/**
* Represents a Client Application
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

class ClientApplication extends BaseApplication {
	constructor(data, client) {
		super(data, client);
	}

	iconURL() {
		
	}

    async fetch() {
		const app = await this.client.rest.get(Routes.oauth2CurrentApplication());
		
		this._patch(app);

        return this;
	}
}


module.exports = ClientApplication;