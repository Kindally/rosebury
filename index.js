const { Client } = require('guilded.js');
const { client_token } = require('./config.json');
const { reformatMsg } = require('./utils/reformatMessage');

const prefix = '!';

const client = new Client({
	token: client_token,
});

client.on('ready', () => {
	console.log(`Bot is successfully logged in as ${client.user.name}`);
});

client.on('messageCreated', async (message) => {
	if (!message.content.startsWith(prefix)) return;
	console.log(reformatMsg(message));
});

client.login();