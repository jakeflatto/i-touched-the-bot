const { prefix } = require('../config.json')

const quickImages = require('../dynamoquickimages.js')
const quickMemes = require('../dynamoQuickMemes.js');

module.exports = {
	name: 'updatequickimg',
	args: true,
	numArgs: 2,
	guilds: ['jakes-playground-dev', 'jakes-playground'],
	usage: '[Name] [URL]',
	example: 'pika https://cdn.discordapp.com/attachments/620157693163864064/620817586233409547/Screen_Shot_2018-10-25_at_11.png',
	execute: async (msg, args) => {
		name = args[0];
		url = args[1];
		let images = await quickImages.getImages();
		let memes = await quickMemes.getMemes();
		if (memes.map(cmd => cmd.name).includes(name)) {
			return msg.reply(`${prefix}${name} is a quickmeme, not a quickimage! It sends: ${memes.filter(cmd => cmd.name == name)[0].url}`);
		}
		if (images.map(cmd => cmd.name).includes(name)) {
			let update = await quickImages.updateImage(name,url);
				return msg.channel.send(`Quick image updated successfully!\n${prefix}${name} now sends ${url}`);
		}

	}
}