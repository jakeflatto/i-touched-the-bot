const imgflip = require('./../imgflip.js');

module.exports = {
	name: 'wait',
	description: `Generates a "wait, you guys are getting ___" meme.`,
	args: true,
	numArgs: 1,
	usage: '<Text>',
	example: '!wait avocado-toast',
	execute(msg, args) {
		action = args[0].split('-').join(' ');

	  	imgflip.generateMemeById(msg,'177682295','',`Wait, you guys are getting ${action}?`);  	
	}
}