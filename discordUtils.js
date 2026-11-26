const MAX_MESSAGE_LENGTH = 2000;

function splitMessage(content) {
	const chunks = [];
	let remaining = content;

	while (remaining.length > MAX_MESSAGE_LENGTH) {
		let splitAt = remaining.lastIndexOf('\n', MAX_MESSAGE_LENGTH);
		if (splitAt <= 0) splitAt = MAX_MESSAGE_LENGTH;

		chunks.push(remaining.slice(0, splitAt));
		remaining = remaining.slice(splitAt + (remaining[splitAt] === '\n' ? 1 : 0));
	}

	if (remaining.length) chunks.push(remaining);
	return chunks;
}

async function sendSplitMessages(channel, content) {
	const sentMessages = [];
	for (const chunk of splitMessage(content)) {
		sentMessages.push(await channel.send(chunk));
	}
	return sentMessages;
}

module.exports = { sendSplitMessages };
