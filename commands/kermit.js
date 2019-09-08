module.exports = {
	name: 'kermit',
	description: `Sends Kermit and Christian Bale nodding GIF.`,
	args: false,
	execute(msg, args) {
		msg.channel.send('https://media0.giphy.com/media/fMwU9EKsJsxmU/source.gif')
	}
}