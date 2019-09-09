const imgflip = require('./../imgflip.js');

module.exports = {
	name: 'exit',
	description: `Generates a "screeching exit off highway" meme.`,
	args: true,
	numArgs: 2,
	usage: '[Highway Text] [Exit Text]',
	example: 'any-other-race tieflings',
	execute(msg, args) {
		highwayText = args[0].split('-').join(' ');
		exitText = args[1].split('-').join(' ');

	  	imgflip.generateMemeById(msg,'124822590',highwayText,exitText);	
	}
}