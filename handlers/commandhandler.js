function reformatMsg(message) {
	const userMsg = message.content.slice(1).trim().split(' ');
	return userMsg;
}

function cmdHandler(message) {
	const userMessage = reformatMsg(message);
	const cmd = userMessage[0];

	try {
		const cmdPath = require(`../commands/${cmd}`);
		cmdPath.callback(message, userMessage);
	}
	catch (err) {
		message.reply('The command does not exist!');
	}
}

module.exports = { cmdHandler };
