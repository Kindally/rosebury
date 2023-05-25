const { Command } = require('../utils/cmdClass');
const { dbCtrl } = require('../mysqldb/connectDB');

const command = new Command(
	'rpchannel',
	'Allows to add channel id to the database',
	true,
);

Command.prototype.infoView = async function(message, sql) {
	const rows = await dbCtrl.view(sql);
	if (rows[0] === undefined) return 'There are no roleplaying channels to view.';
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
		let access;
		if (command.admin) access = await command.cmdCtrl(message.member.isOwner, message.member.roleIds, message.serverId);
		if (!access) return message.reply('Only admins of this server can use this command');

		const [, subcmd, ...args] = userMessage;

		switch (subcmd) {
		case 'add':
			if (!args[0]) return message.reply('You need to specify channel name.');
			await command.editType(
				message,
				false,
				'The channel could not be added as it already exists.',
				`INSERT INTO rp_channel (server_id, channel_id, channel_name) VALUES ('${message.serverId}', '${message.channelId}', '${args[0]}')`,
				`SELECT * FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
			);
			break;
		case 'remove':
			await command.editType(
				message,
				true,
				'The channel could not be removed as it doesn\'t exist.',
				`DELETE FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
				`SELECT * FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
			);
			break;
		case 'update':
			if (!args[0]) return message.reply('You need to specifiy new channel name.');
			await command.editType(
				message,
				true,
				'The channel could not be updated as it doesn\'t exist.',
				`UPDATE rp_channel SET channel_name = '${args[0]}' WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
				`SELECT * FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
			);
			break;
		case 'view':
			await command.infoView(
				message,
				`SELECT * FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`,
			);
			break;
		default:
			return message.reply('You need to use a valid subcommand');
		}
	},
};