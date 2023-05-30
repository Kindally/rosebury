const { Command } = require('../utils/cmdClass');
const { dbCtrl } = require('../mysqldb/connectDB');

const command = new Command(
	'infochannel',
	'Allows to add/edit a channel where the bot will announce profile updates',
	true,
);

Command.prototype.infoView = async function (message, sql) {
	const rows = await dbCtrl.view(sql);
	if (rows[0] === undefined) return 'There are no information channels to view.';
	const content = [];

	for (let i = 0; i < rows.length; i++) {
		content.push(`${rows[i].channel_name}: `);
		content.push(`${rows[i].channel_id}\n`);
	}

	const response = content.join('');
	return message.reply(response);
};

module.exports = {
	callback: async (message, userMessage) => {
		let access = true;
		if (command.admin) access = await command.cmdCtrl(message.member.isOwner, message.member.roleIds, message.serverId);
		if (!access) return message.reply('Only admins of this server can use this command');

		const [, subcmd, ...args] = userMessage;

		switch (subcmd) {
			case 'add':
				if (!args[0]) return message.reply('You need to specify channel name.');
				const errMsg1 = await command.editType(
					`INSERT INTO info_channel (server_id, channel_id, channel_name) VALUES ('${message.serverId}', '${message.channelId}', '${args[0]}')`,
					`SELECT * FROM  info_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
				);
				return message.reply(command.botReply(errMsg1, subcmd));

			case 'remove':
				const errMsg2 = await command.editType(
					`DELETE FROM info_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
					`SELECT * FROM  info_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
					true,
					true,
				);
				return message.reply(command.botReply(errMsg2, subcmd));

			case 'update':
				if (!args[0]) return message.reply('You need to specifiy new channel name.');
				const errMsg3 = await command.editType(
					`UPDATE rp_channel SET channel_name = '${args[0]}' WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
					`SELECT * FROM  info_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
					true,
					true,
				);
				return message.reply(command.botReply(errMsg3, subcmd));

			case 'view':
				const responseView = await command.infoView(
					`SELECT * FROM  info_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
				);
				return message.reply(responseView);

			default:
				return message.reply('You need to use a valid subcommand');
		}
	},
};
