const { prefix } = require('../config.json')

const quickImages = require('../dynamoquickimages.js');

module.exports = {
	name: 'addquickimg',
	args: true,
	numArgs: 2,
	usage: '[Name] [URL]',
	example: 'pika https://cdn.discordapp.com/attachments/620157693163864064/620817586233409547/Screen_Shot_2018-10-25_at_11.png',
	execute: async (msg, args) => {
		name = args[0];
		url = args[1];
		let images = await quickImages.getImages();
		let imageNames = images.map(cmd => cmd.name);
		if (imageNames.includes(name)) {
			return msg.reply(`Sorry, that name is already taken.\n${prefix}${name} sends: ${images.filter(cmd => cmd.name == name)[0].url}`);			
		}
		let add = await quickImages.addImage(name,url);
			return msg.channel.send(`Quick image added successfully!\n${prefix}${name} now sends ${url}`);
	}
}