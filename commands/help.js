const { prefix } = require('../config.json');

const quickImages = require('../dynamoquickimages.js');
const quickMemes = require('../dynamoQuickMemes.js');
const { sendSplitMessages } = require('../discordUtils.js');

//list all commands in a guild
async function generalHelp(msg,commands,guild) {
	const data = []

	
	//if the command was sent directly to the bot, list all commands
	if (guild == 'DM') {
		data.push('Here\'s a list of all my commands:');
		data.push(`\`${commands.map(command => command.name).sort().join(', ')}\``);
	//otherwise, restrict the list to the commands in the guild help was asked in
	} else {
		data.push(`Here\'s a list of all my commands in the server **${guild}**:`);
		data.push(`\`${commandsInGuild(commands,guild)}\``);

	}

	data.push(`Run \`${prefix}alltheimages\` or \`${prefix}allthememes\` to see the available images or memes.`);

	data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

	return sendSplitMessages(msg.author, data.join('\n'))
		.then(() => {
			if (!msg.guild) return;
			msg.reply('I\'ve sent you a DM with all my commands!');
		})
		.catch(error => {
			console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
			msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		});		
}

async function commandHelp(msg,command,botGuildsList) {
	const data = []

	data.push(`**Command:**\n\t${command.name}`);

	if (command.aliases) data.push(`**Aliases:**\n\t${command.aliases.join('\n\t')}`);
	if (command.description) data.push(`**Description:**\n\t${command.description}`);
	if (command.name == 'addquickimg') {
		let images = await quickImages.getImages();
		images = images.map(img => img.name).sort();
		data.push(`**Description:**\n\tSends the quick image stored in the quick images database. Here is the list of currently recognized quick images: \n\t\`${images.join(', ')}\``)
	}
	if (command.guilds) data.push(`**Servers Recognized In:**\n\t${command.guilds.join('\n\t')}`);
	if (!command.guilds) data.push(`**Servers Recognized In:**\n\t${botGuildsList.join('\n\t')}`);
	if (command.usage) data.push(`**Usage:**\n\t\`${prefix}${command.name} ${command.usage}\``);
	if (command.example) data.push(`**Example:**\n\t\`${prefix}${command.name} ${command.example}\``);

	return sendSplitMessages(msg.channel, data.join('\n'));
}

function commandsInGuild(commands, guild) {
	return commands
		.filter(command => command.guilds)
		.filter(command => command.guilds.includes(guild))
		.concat(commands.filter(command => !command.guilds))
		.filter(command => command.name !== 'quickimg')
		.map(command => command.name)
		.sort()
		.join(', ');
}

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	execute: async (msg, args,botGuildsList) => {
		const { commands } = msg.client;
		let guild = '';


		//determine what guild help command was sent in
		if (!msg.guild) {
			guild = 'DM'
		} else {
			guild = msg.guild.name
		}

		//if no command was entered, use general help to list all commands in guild
		if (!args.length) {
			return generalHelp(msg,commands,guild);
		}

		const name = args[0].toLowerCase();
		const images = await quickImages.getImages();
		const memes = await quickMemes.getMemes();
		if (images.map(img => img.name).includes(name)) {
			const url = images.filter(img => img.name == name).map(img => img.url);
			return msg.channel.send(`${prefix}${name} sends ${url}`)
		} else if (memes.map(meme => meme.name).includes(name)) {
			msg.channel.send(`${prefix}${name} sends:`)
			return quickMemes.generateMeme(msg,['[TEXT1]','[TEXT2]'],memes.filter(meme => meme.name == name)[0]);
		}

		//otherwise, command is given, so we parse args and find command
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (command) {
			if (guild !== 'DM' && !commandsInGuild(commands,guild).includes(name)) {
					return msg.reply('that\'s not a valid command in this server!');
			}
			return commandHelp(msg, command, botGuildsList);
		} else {
			return msg.reply('I don\'t recognize that command ¯\\_(ツ)_/¯');	
		}

	}
};