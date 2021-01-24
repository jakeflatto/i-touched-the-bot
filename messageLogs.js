const dynamo = require('./dynamo.js')

module.exports = {
	createLog: (msg, name, args) => {
		let msgLog = {};

		msgLog.id = Number(msg.id);
		msgLog.timestamp = msg.createdTimestamp;
		msgLog.sentIn = msg.channel.type == 'dm' ? 'DM' : msg.channel.guild.name;
		msgLog.sentBy = msg.author.username;
		msgLog.command = name;
		msgLog.args = args;

		return msgLog;
	},
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