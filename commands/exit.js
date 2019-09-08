const imgflip = require('./../imgflip.js');

module.exports = {
	name: 'exit',
	description: `Generates a "screeching exit off highway" meme.`,
	execute(msg, args) {
		if (!args.length) {
			msg.reply(`You haven't provided any meme text! Please provide highway text and exit text.`);
			return;
		}

		if (args.length == 1) {
			msg.reply('You have only provided one piece of meme text! Please provide both highway text and exit text.')
			return;
		}

		highwayText = args[0];
		exitText = args[1];

	  	imgflip.generateMemeById(msg,'124822590',highwayText,exitText);	
	}
}