const imgflip = require('./../imgflip.js');

module.exports = {
	name: 'newsflash',
	description: `Generates a "newsflash assholes" meme.`,
	args: true,
	numArgs: 1,
	usage: '<Text>',
	example: '!newsflash a-sexy-ghost',
	execute(msg, args) {
		action = args[0].split('-').join(' ');

	  	imgflip.generateMemeById(msg,'142106290','newsflash assholes',`I\'ve been ${action} the whole time`);
	}
}