const imgflip = require('./../imgflip.js');

module.exports = {
	name: 'wait',
	description: `Generates a "wait, you guys are getting ___" meme.`,
	execute(msg, args) {
		if (!args.length) {
			msg.reply(`You haven't provided any meme text! Please provide meme text.`);
			return;
		}

		action = args[0]

	  	imgflip.generateMemeById(msg,'177682295','',`Wait, you guys are getting ${action}?`);  	
	}
}