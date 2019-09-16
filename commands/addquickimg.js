const { prefix } = require('../config.json')

const dynamo = require('../dynamo.js')

const quickImages = require('../dynamoquickimages.js')

var currentImgList = [];

module.exports = {
	name: 'addquickimg',
	args: true,
	numArgs: 2,
	usage: '[Name] [URL]',
	example: 'pika https://cdn.discordapp.com/attachments/620157693163864064/620817586233409547/Screen_Shot_2018-10-25_at_11.png',
	execute(msg, args) {
		name = args[0];
		url = args[1];
		dynamo.scan({TableName: 'i-touched-the-bot-quick-images'}, async function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else currentImgList = data.Items.map(item => item.name);
			if (currentImgList.includes(name)) {
				return msg.reply(`Sorry, that image name is already taken.\n${prefix}${name} sends: ${data.Items.filter(img => img.name == name)[0].url}`);
			}
			var images = await quickImages.addImage(name,url);
			return msg.channel.send(`Quick image added successfully! ${prefix}${name} now sends ${url}`)
		})
	}
}