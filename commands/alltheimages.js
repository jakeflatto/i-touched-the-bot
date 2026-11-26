const quickImages = require('../dynamoquickimages.js')
const { sendSplitMessages } = require('../discordUtils.js');

module.exports = {
	name: 'alltheimages',
	execute: async (msg, args) => {
		let images = await quickImages.getImages();
		images = images.map(img => {
			const type = img.url.includes('youtube') || img.url.includes('tiktok')
				? 'video'
				: img.url.includes('gif')
					? 'gif'
					: '';
			return type ? `${img.name} (${type})` : img.name;
		}).sort();
		const data = [
			'Here is the list of currently recognized quick images:',
			`\`${images.join(', ')}\``
		];
		return sendSplitMessages(msg.author, data.join('\n'))
		.then(() => {
			if (!msg.guild) return;
			msg.reply('I\'ve sent you a DM with all the quick images!');
		})
		.catch(error => {
			console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
			msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		});	
	}
}