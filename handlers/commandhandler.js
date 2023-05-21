function reformatMsg(message) {
	const userMsg = message.content.slice(1).trim().split(' ');
	return userMsg;
}

function cmdHandler(message) {
	const userMessage = reformatMsg(message);
	const cmd = userMessage[0];

	const cmdPath = require(`../commands/${cmd}`);

	cmdPath.callback(message, userMessage);
}

module.exports = { cmdHandler };
