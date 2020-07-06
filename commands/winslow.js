const { prefix } = require('../config.json')

module.exports = {
	name: 'winslow',
	description: 'First sends the "!winslowenter" image, and then 3 seconds later, sends the "!winslowexit" image.\nhttps://cdn.discordapp.com/attachments/620157693163864064/666857017625018368/Z.png\nhttps://cdn.discordapp.com/attachments/620157693163864064/666849708668616736/Z.png',
	execute: async (msg, args) => {
		msg.channel.send(`https://cdn.discordapp.com/attachments/620157693163864064/666857017625018368/Z.png`);
		setTimeout(function() {
			return msg.channel.send(`https://cdn.discordapp.com/attachments/620157693163864064/666849708668616736/Z.png`);
		},3000)
		return None;
	}
}