module.exports = {
	name: 'mockify',
	description: 'Turns any text into \'Mocking Spongebob\' text',
	args: true,
	numArgs: 1,
	usage: '[Mocking Text]',
	example: 'mockify may-i-take-your-hat-sir?',
	execute: async (msg, args) => {
		lower = true;
		textToMock = args.join(' ');
		mockifiedText = '';
		for (let letter of textToMock) {
			mockifiedText += lower ? letter.toLowerCase() : letter.toUpperCase();
			lower = !lower;
		}
		return msg.channel.send(mockifiedText);
	}
}