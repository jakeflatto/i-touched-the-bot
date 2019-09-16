const { prefix } = require('../config.json')

const dynamo = require('../dynamo.js')

module.exports = {
	name: 'quickimg',
	description: `Sends the image mapped in the quickimg reference json file.`,
	guilds: ['jakes-playground','jakes-playground-dev'],
	args: false,
	execute(msg, args) {
		var params = {TableName: 'i-touched-the-bot-quick-images', Key: {name: msg.content.slice(prefix.length)}};
		dynamo.get(params, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else msg.channel.send(data.Item.url);           // successful response
		});

	}
}