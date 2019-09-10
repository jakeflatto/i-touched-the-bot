const { prefix } = require('../config.json')

const imgMap = require('../imgmap.json')

module.exports = {
	name: 'quickimg',
	aliases: function () {return imgMap.images.map(img => img.name)}(),
	description: `Sends the image mapped in the quickimg reference json file.`,
	args: false,
	execute(msg, args) {
		console.log(imgMap.images.filter(img => img.name == msg.content.slice(prefix.length)).map(img => img.url));
		msg.channel.send(imgMap.images.filter(img => img.name == msg.content.slice(prefix.length)).map(img => img.url));
	}
}