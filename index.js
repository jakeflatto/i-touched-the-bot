require('dotenv').config()

const config = require('./config.json');
const Discord = require('discord.js');
const messageLogs = require('./messageLogs.js')
const quickImages = require('./dynamoquickimages.js');
const quickMemes = require('./dynamoQuickMemes.js');
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

client.on('message', async msg => {

	if (msg.author.bot) return;

	const botGuildsList = client.guilds.map(guild => guild.name);

	//special case for any mentions of "hubert" or "vish"
	//ignore if it's a bot message
	if (!msg.author.bot 
		//prevents duplicate send if someone used hubert command
		&& !msg.content.startsWith('!hubert') 
			//proc if someone uses any of the following phrases
			&& (msg.content.toLowerCase().includes('hubert') 
			|| msg.content.toLowerCase().includes('he\'s a vish') 
			|| msg.content.toLowerCase().includes('hes a vish'))) {
	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/599073906623512598/source.png');
	}

	//at this point, check for possible commands only by checking prefix
	if (!msg.content.startsWith(config.prefix)) return;

	//parse command and args
	let args = msg.content.slice(config.prefix.length).split(/\s+/);
	const commandName = args.shift().toLowerCase();

	//support for optional arguments
	let argsMap = {}
	if (args.some((arg) => arg.startsWith('--'))) {
		args.map((arg, index) => {
			if (arg.startsWith('--')) {
				argsMap[arg.slice(2)] = args[index + 1]
			}			
		})
	}

	//find command or alias
	const command = client.commands.get(commandName) 
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	//if no command is found, check for a quickimg or quickmeme
	if (!command) {
		var images = await quickImages.getImages();
		var memes = await quickMemes.getMemes();

		if (images.map(img => img.name).includes(commandName) && args.length == 0) {
			messageLogs.addLog(messageLogs.createLog(msg,commandName,args));
			return msg.channel.send(images.filter(img => img.name == commandName).map(img => img.url)[0])
		} else if (memes.map(meme => meme.name).includes(commandName)) {
			//special case for the everywhere meme
			if (commandName == 'everywhere') {
				if (args.length == 1) {
					args.push(`${args[0]} everywhere`)
				}
			}

			//special case for the always has been meme
			if (commandName == 'always') {
				if (args.length == 1) {
					args.push(`Always has been`)
				}
			}

			//special case for memes that can be used with 1 arg or two, e.g. !nut
			if (args.length == 1) {
				args.unshift('')
			}
			messageLogs.addLog(messageLogs.createLog(msg,commandName));
			return quickMemes.generateMeme(msg,args,memes.filter(meme => meme.name == commandName)[0]);
		}
	}

	//if still no command exists, do nothing
	if (!command) return;

	//if command is found, log it
	messageLogs.addLog(messageLogs.createLog(msg,commandName,args));

	//if command specifies allowed guilds, and we are in a guild, check if command is allowed in guild
	if(command.guilds && !(msg.author.lastMessage.mentions._guild == null)) {
		if (!command.guilds.includes(msg.author.lastMessage.mentions._guild.name)) {
			return;
		}
	}

	//check if arguments are optional
	if (Object.keys(argsMap).length) {
		args = argsMap;
	}
	//otherwise validate number of arguments provided
	else if (command.args && (!args.length || args.length < command.numArgs)) {
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

	/*
		finally, try the command and if something goes wrong:
		1) log the error in the console and the log channel
		2) let the user something went wrong 
	 */
	command.execute(msg,args,botGuildsList)
		.catch((err) => {
			console.log(err);

			let errorMessageData = `${msg.author} got the following error when trying to execute this: \`${msg.content}\` \n \`${err.stack}\``;
			client.channels.get(config.errorLogChannelId).send(errorMessageData);

			msg.reply(`Sorry, there was an error trying to execute the command: \`${config.prefix}${commandName}\``);
		});
});


client.login(process.env[config.botToken])