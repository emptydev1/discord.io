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
const { Client, MessageEmbed, Events } = require("djs");
const client = new Client("Your bot token", {
    intents: [
        "guildMessages", "guildMembers", "guilds"
    ] // default is all of non-privileged intents
});

// Events:
client.on(Events.Ready, () => {
    console.log(`Ready on ${client.user.tag}!`);
})

client.on(Events.MessageCreate, message => {
    if (message.content.toLowerCase().startsWith('!ping')) {
        client.createMessage(message.channel.id, "🏓 Pong!")
    }
})

// Connect the client
client.run()
```
<hr>

# Contributors
**[Empty™#4646](https://discord.com/users/1036018691562803260)**
