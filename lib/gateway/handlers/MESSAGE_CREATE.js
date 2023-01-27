'use strict';

const Message = require("../../structures/Message");
const Events = require("../../util/events");

module.exports = (client, packet) => {
    const message = new Message(packet.d);

    client.channels.get(message.channelId)?.messages?.set(message.id, message);

    client.emit(Events.Ready, message);
};
