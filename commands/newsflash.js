const imgflip = require('./../imgflip.js');

module.exports = {
	name: 'newsflash',
	description: `Generates a "newsflash assholes" meme.`,
	execute(msg, args) {
		if (!args.length) {
			msg.reply(`You haven't provided any meme text! Please provide meme text.`);
			return;
		}

		action = args[0];

	  	imgflip.generateMemeById(msg,'142106290','newsflash assholes',`I\'ve been ${action} the whole time`);
	}
}