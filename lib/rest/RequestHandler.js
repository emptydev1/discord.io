const { Routes, CDNRoutes } = require("./Endpoints");
const { GatewayVersion } = require("../util/Constants");
const { request } = require("undici");
const methods = ["GET", "POST", "PATCH", "PUT", "DELETE"];

/**
 * Represents a Discord API request manager
 * @prop {String} api The discord api base URL
 * @prop {String} cdn The discord cdn base URL
 * @prop {String} authPrefix The authentication prefix 
 * @prop {String} version The discord gateway version
 * @prop {String} UserAgent The request header user agent
 * @prop {String} token The client token to use
 */
class REST {
    constructor() {
        this.api = Routes.base_url + Routes.base_path;
        this.cdn = CDNRoutes.base_url;
        this.authPrefix = "Bot";
        this.token = null;
        this['User-Agent'] = `DiscordBot`;
        this.version = GatewayVersion;
    }

    /**
     * Sets the rest token's
     * @param {String} token The client token to be used 
     */
    setToken(token) {
        this.token = token.replace(/(Bot|Bearer)/g, "");

        return this;
    }

    /**
     * Sets the request user agent
     * @param {String} UserAgent The user agent to use when making a request 
     */
    setUserAgent(UserAgent) {
        if (typeof(UserAgent) === "string") this.UserAgent = UserAgent;

        return this;
    }

    /**
     * Sends an HTTP request to the Discord API 
     * @param {String} path The URL path 
     * @param {String} method The method of the HTTP request, the method must be one of: GET, POST, PATCH, PUT, DELETE
     * @param {Object | String} body The body of the HTTP request, can be an object or a string 
     * @param {Boolean} json Whether to return the HTTP request result in JSON format 
     */
    async request(path, method, body, json = true) {
        if (!this.token) throw new Error(`Client token not set`);

        method = String(method).toUpperCase();

        if (!methods.includes(method)) throw new RangeError(`The request method must be just one of ${methods.join(", ")}. Received: ${method}`);

        const URL = `${this.api}${path}`;
        const BaseOptions = {
            method,
            headers: {
                Authorization: `${this.authPrefix} ${this.token}`,
                'User-Agent': this['UserAgent'],
                'Content-Type': 'application/json'
            }
        }

        if (body && (method !== "GET")) {
            BaseOptions.body = typeof(body) == "string"
                ? body
                : JSON.stringify(body)
        }

        try {
            const data = await request(URL, BaseOptions);

            if (json) {
                return await data.body.json();
            } else return;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Performs an HTTP request with the GET method 
     * @param {String} path The URL path 
     */
    get(path) {
        return this.request(path, "GET");
    }

    /**
     * Performs an HTTP request with the POST method 
     * @param {Object | String} body The body of the request 
     * @param {Boolean} json Whether to return the HTTP request result in JSON format
     */
    post(path, body = {}, json) {
        return this.request(path, "POST", JSON.stringify(body), json);
    }

    /**
     * Performs an HTTP request with the PATCH method 
     * @param {Object | String} body The body of the request 
     * @param {Boolean} json Whether to return the HTTP request result in JSON format
     */
    patch(path, body = {}, json) {
        return this.request(path, "PATCH", JSON.stringify(body), json);
    }

    /**
     * Performs an HTTP request with the PUT method 
     * @param {Object | String} body The body of the request 
     * @param {Boolean} json Whether to return the HTTP request result in JSON format
     */
    put(path, body = {}, json) {
        return this.request(path, "PUT", JSON.stringify(body), json);
    }

    /**
     * Performs an HTTP request with the DELETE method 
     * @param {Object | String} body The body of the request 
     * @param {Boolean} json Whether to return the HTTP request result in JSON format
     */
    delete(path, body = {}, json) {
        return this.request(path, "DELETE", JSON.stringify(body), json);
    }
}


module.exports = REST;
