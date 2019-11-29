const { prefix } = require('../config.json')

const quickMemes = require('../dynamoQuickMemes.js')

module.exports = {
	name: 'addquickmeme',
	args: true,
	numArgs: 6,
	guilds: ['jakes-playground-dev'],
	usage: '[Imgflip Meme ID] [Name] [Text0 Before] [Text0 After] [Text1 Before] [Text1 After]',
	example: '',
	execute: async (msg, args) => {
		name = args[0];
		url = args[1];
		let images = await quickImages.getImages();
		let imageNames = images.map(img => img.name);
		if (imageNames.includes(name)) {
			return msg.reply(`Sorry, that image name is already taken.\n${prefix}${name} sends: ${data.Items.filter(img => img.name == name)[0].url}`);			
		}
		let add = await quickImages.addImage(name,url);
			return msg.channel.send(`Quick image added successfully!\n${prefix}${name} now sends ${url}`);
	}
}