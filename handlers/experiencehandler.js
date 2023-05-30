const { dbCtrl } = require('../mysqldb/connectDB');

function expHandler(client) {
	client.on('messageCreated', async (message) => {
		if (message.author === null) return;

		let settings = await dbCtrl.view(`SELECT * FROM settings WHERE server_id = '${message.serverId}'`);

		if (settings[0] === undefined) {
			settings = await dbCtrl.view(`SELECT * FROM settings WHERE server_id = '${message.serverId}'`);
		}

		if (message.content.startsWith(settings[0].prefix)) return;

		const checkChannel = await dbCtrl.view(`SELECT * FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`);
		if (checkChannel[0] === undefined) return;

		const checkProfile = await dbCtrl.view(`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND active = 1`);
		if (checkProfile[0] === undefined) return;

		const serverSettings = await dbCtrl.view(`SELECT * FROM settings WHERE server_id = '${message.serverId}'`);

		const newExp = Math.round(message.content.trim().length / serverSettings[0].experience_rate);

		if (checkProfile[0].experience + newExp >= 1000) {
			dbCtrl.edit(`UPDATE profiles SET level = ${checkProfile[0].level + 1}, experience = ${checkProfile[0].experience + newExp - 1000} WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND active = 1`);
			const viewInfoChannel = await dbCtrl.view(`SELECT * FROM info_channel WHERE server_id = '${message.serverId}'`);
			if (viewInfoChannel[0] === undefined) return;
			else return message.reply(`${checkProfile[0].profile_name} that belongs to @${message.authorId} has leveled up to level ${checkProfile[0].level + 1}!`);
		}
		else {
			dbCtrl.edit(`UPDATE profiles SET experience = ${checkProfile[0].experience + newExp} WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND active = 1`);
		}
	});
}

module.exports = { expHandler };
