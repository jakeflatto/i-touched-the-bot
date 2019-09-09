module.exports = {
	name: 'poe',
	description: `Sends Poe image.`,
	args: false,
	guilds: ['jakes-playground-dev', 'jakes-playground'],
	execute(msg, args) {
	  	msg.channel.send('https://cdn.discordapp.com/attachments/446392670668062724/616480057250283521/1c3.jpg')
	}
}