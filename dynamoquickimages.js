const dynamo = require('./dynamo.js')

module.exports = {
	getImages: () => dynamo.scan({TableName: 'i-touched-the-bot-quick-images'}).promise().then((data) => data.Items),
	addImage: (name, url) => {
		var params = {
			Item: {
				"name": name, 
				"url": url
			}, 
			TableName: "i-touched-the-bot-quick-images"
		};
		return dynamo.put(params).promise();
	}
}