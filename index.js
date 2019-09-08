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
	console.log(msg.channel.guild.name)

	if (!msg.author.bot && (!msg.content.startsWith('!hubert') && msg.content.toLowerCase().includes('hubert') || msg.content.toLowerCase().includes('he\'s a vish') || msg.content.toLowerCase().includes('hes a vish'))) {
	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/599073906623512598/source.png');
	}

	if (!msg.content.startsWith(config.prefix)) return;

	const args = msg.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) 
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && (!args.length || args.length < command.numArgs)) {
		let reply = `You didn't provide enough arguments for the command: "${config.prefix}${commandName}"`
		msg.reply(reply)

		let moreInfo = ``;
	
		if (command.usage) {
			moreInfo += `The proper usage would be: ${config.prefix}${commandName} ${command.usage}`;
		
			if (command.example) {
				moreInfo += `\nFor example:`;
				msg.channel.send(moreInfo);
				return msg.channel.send(command.example);
			}
			
			if (!moreInfo=='') {
				return msg.channel.send(moreInfo);			
			}
		}
	
		return;
	}

	try {
		command.execute(msg,args);

	} catch (error) {
		console.error(error);
		msg.reply(`There was an error trying to execute the command: "${config.prefix + commandName}"`)
	}
})


client.login(process.env[config.botToken]) 