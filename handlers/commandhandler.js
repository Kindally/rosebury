function reformatMsg(message) {
	const userMsg = message.content.slice(1).trim().split(' ');
	return userMsg;
}

function cmdHandler(client, prefix) {
	client.on('messageCreated', async (message) => {
		if (!message.content.startsWith(prefix)) return;

		const userMessage = reformatMsg(message);
		const cmd = userMessage[0];

		try {
			const cmdPath = require(`../commands/${cmd}`);
			cmdPath.callback(message, userMessage);
		}
		catch (err) {
			console.log(err);
			return message.reply('The command does not exist!');
		}
	});
}

module.exports = { cmdHandler };
