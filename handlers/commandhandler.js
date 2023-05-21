const path = require('node:path');

function reformatMsg(message) {
	const userMsg = message.content.slice(1).trim().split(' ');
	return userMsg;
}

function cmdHandler(message) {
	const userMessage = reformatMsg(message);
}

