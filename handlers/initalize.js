const { dbCtrl } = require('../mysqldb/connectDB');

function initialSetup(client) {
	client.on('messageCreated', async (message) => {
		if (message.author === null) return;

		let settings = await dbCtrl.view(`SELECT * FROM settings WHERE server_id = '${message.serverId}'`);

		if (settings[0] === undefined) {
			dbCtrl.edit(`INSERT INTO settings (server_id, prefix, experience_rate) VALUES ('${message.serverId}', '!', 100)`);
			settings = await dbCtrl.view(`SELECT * FROM settings WHERE server_id = '${message.serverId}'`);
		}
	});
}

module.exports = { initialSetup };