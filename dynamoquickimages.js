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
	},
	updateImage: (name, url) => {
		var params = {
		    TableName: "i-touched-the-bot-quick-images",
		    Key:{
		        "name": name
		    },
		    ExpressionAttributeValues:{
		        ":u": url
		    },
		    ExpressionAttributeNames: {
		    	"#u": "url"
		    },
		    UpdateExpression: "SET #u = :u",
		    ReturnValues:"UPDATED_NEW"
		};
		return dynamo.update(params).promise().catch((err) => console.log(err));
	}
}