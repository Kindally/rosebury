const { Client } = require('guilded.js');
const { client_token } = require('./config.json');
const { cmdHandler } = require('./handlers/commandhandler');

const prefix = '!';

const client = new Client({
	token: client_token,
});

client.on('ready', () => {
	console.log(`Bot is successfully logged in as ${client.user.name}`);
});

cmdHandler(client, prefix);

client.login();