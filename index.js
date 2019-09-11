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

	const botGuildsList = client.guilds.map(guild => guild.name);
	
	//special case for any mentions of "hubert" or "vish"
	//ignore if it's a bot message
	if (!msg.author.bot 
		//ignore if someone used hubert command
		&& !msg.content.startsWith('!hubert') 
			//proc if someone uses any of the following phrases
			&& (msg.content.toLowerCase().includes('hubert') 
			|| msg.content.toLowerCase().includes('he\'s a vish') 
			|| msg.content.toLowerCase().includes('hes a vish'))) {
	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/599073906623512598/source.png');
	}

	//at this point, check for commands only by checking prefix
	if (!msg.content.startsWith(config.prefix)) return;

	//parse command and args
	const args = msg.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	//find command or alias
	const command = client.commands.get(commandName) 
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	//if no command exists, do nothing
	if (!command) return;

	//if command specifies allowed guilds, and we are in a guild, check if command is allowed in guild
	if(command.guilds && !msg.author.lastMessage.mentions._guild == null) {
		if (!command.guilds.includes(msg.author.lastMessage.mentions._guild.name)) {
			return;
		}
	}

	//validate number of arguments provided
	if (command.args && (!args.length || args.length < command.numArgs)) {
		let reply = `You didn't provide enough arguments for the command: "${config.prefix}${commandName}"`
		msg.reply(reply)

		let moreInfo = ``;
	
		if (command.usage) {
			moreInfo += `The proper usage would be: \`${config.prefix}${commandName} ${command.usage}\``;
		
			if (command.example) {
				moreInfo += `\nFor example:`;
				msg.channel.send(moreInfo);
				return msg.channel.send(`\`${config.prefix}${commandName} ${command.example}\``);
			}
			
			if (!moreInfo=='') {
				return msg.channel.send(moreInfo);			
			}
		}
	
		return;
	}

	try {
		command.execute(msg,args,botGuildsList);

	} catch (error) {
		console.error(error);
		msg.reply(`There was an error trying to execute the command: "${config.prefix + commandName}"`)
	}
})


client.login(process.env[config.botToken])