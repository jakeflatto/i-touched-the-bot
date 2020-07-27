const dynamo = require('./dynamo.js')

module.exports = {
	addLog: (log) => {
		if (!log.id) {
			throw 'There was no log id!'
		};
		var params = {
			Item: log,
			TableName: "i-touched-the-bot-message-logs"
		};
		return dynamo.put(params).promise();
	}
}