'use strict';

const Application = require("../../structures/Application");
const User = require("../../structures/User");


module.exports = (client, packet, shard) => {
    if (client.application) {
        client.application._patch(packet.d.application);
    } else new Application(client, packet.d.application);

    if (client.user) {
        client.user._patch(packet.d.user);
    } else new User(client, packet.d.user);

    for (const guild of packet.d.guilds) {}

    shard.checkReady();
};
