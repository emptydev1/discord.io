'use strict';

const ClientApplication = require("../../structures/ClientApplication");
const ClientUser = require("../../structures/ClientUser");


module.exports = (client, packet, shard) => {
    if (!client.user) {
        client.user = new ClientUser(packet.d.user);
        client.users._add(client.user);
    } else {
        client.user._patch(packet.d.user);
    }

    if (!client.application) {
        client.application = new ClientApplication(packet.d.application);
    } else {
        client.application._patch(packet.d.application);
    }


    for (const guild of packet.d.guilds) {}


    shard.checkReady();
}.
