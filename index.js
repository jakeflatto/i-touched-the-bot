require('dotenv').config()


const Discord = require('discord.js')
const client = new Discord.Client()


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content.startsWith ('!hubert')) {
    msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/599073906623512598/source.png')
  }
})

client.login('NjE0NjkxOTIxNzg0MzQwNDkx.XWDKvw.1dkIB-fS6lVjd0TI6H_k0Iz_me8') 