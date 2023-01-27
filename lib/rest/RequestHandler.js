const { Routes, CDNRoutes } = require("./Endpoints");
const { GatewayVersion } = require("../util/Constants");
const { request } = require("undici");
const methods = ["GET", "POST", "PATCH", "PUT", "DELETE"];



class REST {
    constructor() {
        this.api = Routes.base_url + Routes.base_path;
        this.cdn = CDNRoutes.base_url;
        this.authPrefix = "Bot";
        this.token = null;
        this['User-Agent'] = `DiscordBot`;
        this.version = GatewayVersion;
    }

    setToken(token) {
        this.token = token.replace(/(Bot|Bearer)/g, "");

        return this;
    }

    setUserAgent(UserAgent) {
        if (typeof(UserAgent) === "string") this['User-Agent'] = UserAgent;

        return this;
    }

    async request(path, method, body, json = true) {
        if (!this.token) throw new Error(`Client token not set`);


        method = String(method).toUpperCase();

        if (!methods.includes(method)) throw new RangeError(`The request method must be just one of ${methods.join(", ")}. Received: ${method}`);


        const URL = `${this.api}${path}`;
        const BaseOptions = {
            method,
            headers: {
                Authorization: `${this.authPrefix} ${this.token}`,
                'User-Agent': this['User-Agent'],
                'Content-Type': 'application/json'
            }
        }

        if (body && (method !== "GET")) {
            BaseOptions.body = typeof(body) == "string"
                ? body
                : JSON.stringify(body)
        }


        try {
            if (json) {
                return (await (await request(URL, RequestOptions)).body.json());
            } else return;
        } catch (error) {
            throw new Error(error);
        }
    }


    get(path) {
        return this.request(path, "GET");
    }

    post(path, body = {}, json) {
        return this.request(path, "POST", JSON.stringify(body), json);
    }

    patch(path, body = {}, json) {
        return this.request(path, "PATCH", JSON.stringify(body), json);
    }

    put(path, body = {}, json) {
        return this.request(path, "PUT", JSON.stringify(body), json);
    }

    delete(path, body = {}, json) {
        return this.request(path, "DELETE", JSON.stringify(body), json);
    }
}


module.exports = REST;
