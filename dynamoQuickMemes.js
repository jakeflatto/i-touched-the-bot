const dynamo = require('./dynamo.js')
const imgflip = require('./imgflip.js')

module.exports = {
	generateMeme: (msg,args,meme) => {
		const text0Before = meme.text0_before || '';
		const text0After = meme.text0_after || '';
		const text1Before = meme.text1_before || '';
		const text1After = meme.text1_after || '';
		const text0 = `${text0Before} ${args[0].split('-').join(' ')} ${text0After}`;
		const text1 = `${text1Before} ${args[1].split('-').join(' ')} ${text1After}`;
		imgflip.generateMemeById(msg,meme.id,text0,text1);
	},
	getMemes: () => dynamo.scan({TableName: 'i-touched-the-bot-quick-memes'}).promise().then((data) => data.Items),
	addMeme: (item) => {
		if (!item.id || !item.name) {
			throw 'You must provide an id and a name!'
		};
		var params = {
			Item: item,
			// {
			// 	"id": id,
			// 	"name": name,
			// 	"imgflip_name": imgflipName || null,
			// 	"text0_before": text0Before || null,
			// 	"text0_after": text0After || null, 
			// 	"text1_before": text1Before || null,
			// 	"text1_after": text1After || null
			// }, 
			TableName: "i-touched-the-bot-quick-memes"
		};
		return dynamo.put(params).promise();
	}
}