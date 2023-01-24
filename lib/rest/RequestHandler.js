const {
    Routes,
    CDNRoutes
} = require("./Endpoints");
const {
    rest_version
} = require("../util/Constants");
const {
    request
} = require("undici");
const methods = ["GET", "POST", "PATCH", "PUT", "DELETE"];



class REST {
    constructor() {
        this.api = Routes.base_url + Routes.base_path;
        this.cdn = CDNRoutes.base_url;
        this.authPrefix = "Bot";
        this.token = null;
        this['User-Agent'] = `DiscordBot (sunsire.js) Node ${process.version}`;
        this.version = rest_version;
    }

    setToken(token) {
        this.token = token.replace(/(Bot|Bearer)/g, "");

        return this;
    }

    setUserAgent(userAgent) {
        this['User-Agent'] = typeof(userAgent) == "string" ? userAgent : null;

        return this;
    }

    async request(path, method, body) {
        if (!this.token) throw new Error(`Client token not set`);


        method = methods.includes(String(method)
            .toUpperCase()) ? method.toUpperCase() : throw new RangeError(`The request method must be just one of ${methods.join(", ")}, received: ${method.toUpperCase()}`);

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
            BaseOptions.body = typeof(body) == "string" ?
                body :
                JSON.stringify(body)
        }


        try {
            return await (await request(URL, BaseOptions))
                .body.json();
        } catch (error) {
            throw new Error(error);
        }
    }


    get(path) {
        return this.request(path, "GET");
    }

    post(path, body = {}) {
        return this.request(path, "POST", JSON.stringify(body));
    }

    patch(path, body = {}) {
        return this.request(path, "PATCH", JSON.stringify(body));
    }

    put(path, body = {}) {
        return this.request(path, "PUT", JSON.stringify(body));
    }

    delete(path, body = {}) {
        return this.request(path, "DELETE", JSON.stringify(body));
    }
}


module.exports = REST;
