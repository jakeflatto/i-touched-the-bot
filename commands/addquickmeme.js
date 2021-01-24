const { prefix } = require('../config.json');

const quickMemes = require('../dynamoQuickMemes.js');

module.exports = {
	name: 'addquickmeme',
	args: true,
	numArgs: 2,
	guilds: ['jakes-playground-dev', 'jakes-playground'],
	usage: '--id [Imgflip Meme ID] --n [Name] --url [URL] --t0b [Text0 Before] --t0a [Text0 After] --t1b [Text1 Before] --t1a [Text1 After]',
	example: '',
	execute: async (msg, args) => {
		console.log('5')
		let meme = {}
		meme.id = args.id;
		meme.name = args.n;
		meme.url = args.url;
		let memes = await quickMemes.getMemes();
		let memeNames = memes.map(cmd => cmd.name);
		if (memeNames.includes(meme.name)) {
			return msg.reply(`Sorry, that name is already taken.\n${prefix}${meme.name} sends: ${memes.filter(cmd => cmd.name == meme.name)[0].url}`);			
		}
		if (args.t0b) meme.text0_before = args.t0b;
		if (args.t0a) meme.text0_after = args.t0a;
		if (args.t1b) meme.text1_before = args.t1b;
		if (args.t1a) meme.text1_after = args.t1a
		let add = await quickMemes.addMeme(meme);
		msg.channel.send(`Quick meme added successfully!\n${prefix}${meme.name} now sends:`);
		return quickMemes.generateMeme(msg,['[TEXT1]','[TEXT2]'],meme);
	}
}