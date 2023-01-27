# Discord.js

<p>A Node.js Discord library</p>

## About

- Developed using Node.js 
- Easy to make bots 
- Simple to use 

<hr>

# How to use?
**Instalation**
```sh-session
npm install discord.js
yarn add discord.js
```
**See the examples below:**
```js
const { Client, MessageEmbed } = require("djs");
const client = new Client("Your bot token", {
    intents: [
        "guildMessages", "guildMembers", "guilds"
    ], // default is all of non-privileged intents 
    shards: 'auto', // shards for this client
});

// Events:
client.on('ready', () => {
    console.log(`Ready on ${client.user.tag}!`);
})

client.on('message_create', message => {
    if (message.content.toLowerCase().startsWith('!ping')) {
        const embed = new MessageEmbed()
            .setDescription(`My current latency is ${client.ws.ping} milliseconds!`)
            .setColor("#ff0000")

        client.createMessage(message.channel.id, {
            content: "🏓 Pong!",
            embeds: [embed]
        })
    }
})

// Connect the client
client.connect()
```
<hr>

# Contributors
**[Empty™#4646](https://discord.com/users/1036018691562803260)**
