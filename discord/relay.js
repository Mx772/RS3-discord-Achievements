const config = require("../config.json")
const c = require('../util/defClasses')
const route = require('./route.js')
const Discord = require('discord.js');
const client = new Discord.Client();

 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('message', msg => {
  if (msg.content.startsWith(';')) {
    route.router(msg.content)
  }
  if (msg.content === 'penis') {
    msg.reply('pong');
  }
});
 
client.login(config.discord.token);

// on new guild join - generate new .js file

//joined a server
client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    //Your other stuff like adding to guildArray
    console.log(guild)
    let newGuild = new c.Server(guild)
    guildArray.push(newGuild)
})

//removed from a server
client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
    //remove from guildArray
})
