const { prefix } = require('../config.json')

const quickImages = require('../dynamoquickimages.js')

module.exports = {
	name: 'alltheimages',
	execute: async (msg, args) => {
		let images = await quickImages.getImages();
		images = images.map(img => `${img.name} (${img.url.includes('youtube') || img.url.includes('tiktok') ? 'video' : img.url.includes('gif') ? 'gif' : 'image'}) -- <${img.url}>`).sort();
		data = []
		data.push(`Here is the list of currently recognized quick images:`)
		data.push(images.join('\n'))
		return msg.author.send(data, { split: true })
		.then(() => {
			if (msg.channel.type === 'dm') return;
			msg.reply('I\'ve sent you a DM with all the quick images!');
		})
		.catch(error => {
			console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
			msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
		});	
	}
}