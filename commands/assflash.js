const imgflip = require('./../imgflip.js');

module.exports = {
	name: 'assflash',
	description: `Generates an "assflash newsholes" meme.`,
	args: true,
	numArgs: 1,
	usage: '<Text>',
	example: '!assflash a-sexy-ghost',
	execute(msg, args) {
		action = args[0].split('-').join(' ');

	  	imgflip.generateMemeById(msg,'142106290','assflash newsholes',`I\'ve been ${action} the whole time`);
	}
}