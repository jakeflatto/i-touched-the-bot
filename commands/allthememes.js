const { prefix } = require('../config.json')

const quickImages = require('../dynamoquickimages.js')
const quickMemes = require('../dynamoQuickMemes.js');

module.exports = {
	name: 'allthememes',
	execute: async (msg, args) => {
		let memes = await quickMemes.getMemes();
		memes = memes.map(meme => `${meme.name} -- <https://imgflip.com/memegenerator/${meme.id}>`).sort();
		data = []
		data.push(`Here is the list of currently recognized quick memes:`)
		data.push(memes.join('\n'))
		return msg.author.send(data, { split: true })
		.then(() => {
			if (msg.channel.type === 'dm') return;
			msg.reply('I\'ve sent you a DM with all the quick memes!');
		})
		.catch(error => {
			console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
			msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		});	
	}
}