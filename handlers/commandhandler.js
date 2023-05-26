const { dbCtrl } = require('../mysqldb/connectDB');

function reformatMsg(message) {
	const userMsg = message.content.slice(1).trim().split(' ');
	return userMsg;
}

async function cmdHandler(client) {
	client.on('messageCreated', async (message) => {
		if (message.author === null) return;
		let settings = await dbCtrl.view(`SELECT * FROM settings WHERE server_id = '${message.serverId}'`);

		if (settings[0] === undefined) {
			settings = await dbCtrl.view(`SELECT * FROM settings WHERE server_id = '${message.serverId}'`);
		}

		if (!message.content.startsWith(settings[0].prefix)) return;

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
