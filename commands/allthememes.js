const quickMemes = require('../dynamoQuickMemes.js');
const { sendSplitMessages } = require('../discordUtils.js');

module.exports = {
	name: 'allthememes',
	execute: async (msg, args) => {
		let memes = await quickMemes.getMemes();
		memes = memes.map(meme => meme.name).sort();
		const data = [
			'Here is the list of currently recognized quick memes:',
			`\`${memes.join(', ')}\``
		];
		return sendSplitMessages(msg.author, data.join('\n'))
		.then(() => {
			if (!msg.guild) return;
			msg.reply('I\'ve sent you a DM with all the quick memes!');
		})
		.catch(error => {
			console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
			msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		});	
	}
}