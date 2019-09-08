require('dotenv').config()

const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {

	if (msg.content.toLowerCase().includes('hubert') || msg.content.toLowerCase().includes('he\'s a vish') || msg.content.toLowerCase().includes('hes a vish')) {
	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/599073906623512598/source.png')
	}

	if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

	const args = msg.content.slice(config.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) {
		// msg.reply(`Sorry, no command found for: "${config.prefix + command}" ...`);
		return;
	}

	try {
		client.commands.get(command).execute(msg,args);
	} catch (error) {
		console.error(error);
		msg.reply(`There was an error trying to execute the command: "${config.prefix + command}" ...`)
	}
})


client.login(process.env[config.botToken]) 