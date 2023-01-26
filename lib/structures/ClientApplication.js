const BaseApplication = require("./BaseApplication");
const createdTimestamp = require("../util/createdTimestamp");
const { Routes, CDNRoutes } = require("../rest/Endpoints");

/**
 * Represents a Client Application
 * @extends BaseApplication
 */

class ClientApplication extends BaseApplication {
    constructor(client, data) {
        super(client, data);
    }

    /**
     * Get the application's icon URL
     * @type {String}
     * @param {URLOptions} [options] The options for make the URL
     */
    iconURL(options = {}) {
        return CDNRoutes.applicationIcon(this.id, this.icon, options);
    }

    /**
     * Get the application's created timestamp
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
        return createdTimestamp(this.id);
    }

    /**
     * The application's creation date
     * @type {?date}
     * @readonly
     */
    get creationDate() {
        return new Date(this.createdTimestamp);
    }

    /** 
     * Obtains this application from Discord
     * @returns {Promise<ClientApplication>} 
     */
    async fetch() {
        const app = await this.client.rest.get(Routes.oauth2CurrentApplication());	
	super._patch(app);

        return this;
    }

    /**
     * Whether this application is an partial
     * @type {boolean}
     * @readonly
     */
    get partial() {
        return !this.name;
    }

    get toJSON() {
        const data = JSON.parse(JSON.stringify(this));

        data.createdTimestamp = this.createdTimestamp;
        data.creationDate = this.creationDate;
        data.partial = this.partial;

        return data;
    }
}


module.exports = ClientApplication;
