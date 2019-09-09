const { prefix } = require('../config.json');


//list all commands in a guild
function generalHelp(msg,commands,guild) {
	data = []

	//if the command was sent directly to the bot, list all commands
	if (guild == 'DM') {
		data.push('Here\'s a list of all my commands:');
		data.push(commands.map(command => command.name).join(', '));
	//otherwise, restrict the list to the commands in the guild help was asked in
	} else {
		data.push(`Here\'s a list of all my commands in the server **${guild}**:`);
		data.push(commandsInGuild(commands,guild));

	}


	data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

	return msg.author.send(data, { split: true })
		.then(() => {
			if (msg.channel.type === 'dm') return;
			msg.reply('I\'ve sent you a DM with all my commands!');
		})
		.catch(error => {
			console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
			msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		});		
}

function commandHelp(msg,command,botGuildsList) {
	data = []

	data.push(`**Command:**\n\t${command.name}`);

	if (command.aliases) data.push(`**Aliases:**\n\t${command.aliases.join('\n\t')}`);
	if (command.description) data.push(`**Description:**\n\t${command.description}`);
	if (command.guilds) data.push(`**Servers Recognized In:**\n\t${command.guilds.join('\n\t')}`);
	if (!command.guilds) data.push(`**Servers Recognized In:**\n\t${botGuildsList.join('\n\t')}`);
	if (command.usage) data.push(`**Usage:**\n\t\`${prefix}${command.name} ${command.usage}\``);
	if (command.example) data.push(`**Example:**\n\t\`${prefix}${command.name} ${command.example}\``);

	msg.channel.send(data, { split: true });		
}

function commandsInGuild(commands, guild) {
	return commands
		.filter(command => command.guilds)
		.filter(command => command.guilds.includes(guild))
		.concat(commands.filter(command => !command.guilds))
		.map(command => command.name)
		.sort()
		.join(', ');
}

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	execute(msg, args,botGuildsList) {
		const data = [];
		const { commands } = msg.client;
		let guild = ''

		//determine what guild help command was sent in
		if (msg.author.lastMessage.mentions._guild == null) {
			guild = 'DM'
		} else {
			guild = msg.author.lastMessage.mentions._guild.name
		}

		//if no command was entered, use general help to list all commands in guild
		if (!args.length) {
			return generalHelp(msg,commands,guild);
		}

		//otherwise, command is given, so we parse args and find command
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		//if the command doesn't exist or isn't allowed in this guild, send invalid message
		if (!command) {
			return msg.reply('that\'s not a valid command!');
		}

		if (guild !== 'DM' && !commandsInGuild(commands,guild).includes(name)) {
			return msg.reply('that\'s not a valid command in this server!');
		}

		return commandHelp(msg,command,botGuildsList);
	}
};