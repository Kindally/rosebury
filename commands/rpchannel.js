const { Command } = require('../utils/cmdClass');

const command = new Command(
	'rpchannel',
	'Allows to add channel id to the database',
	false,
	true,
);

module.exports = {
	callback: async (message, userMessage) => {
		if (command.admin || command.dev) command.cmdCtrl(message, message.member.isOwner, message.authorId);
		const [, subcmd, ...args] = userMessage;
		const viewSql = `SELECT * FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${message.channelId}'`;
		const subcmdRemoveSql = `SELECT * FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${args[0]}'`;
		const tableColumn = 'channel_name';

		switch (subcmd) {
		case 'add':
			command.editType(
				message,
				false,
				'The channel could not be added as it already exists.',
				`INSERT INTO rp_channel (server_id, channel_id, channel_name) VALUES ('${message.serverId}', '${message.channelId}', '${args[0]}')`,
				viewSql,
				tableColumn,
			);
			break;
		case 'remove':
			command.editType(
				message,
				true,
				'The channel could not be removed as it doesn\'t exist.',
				`DELETE FROM rp_channel WHERE server_id = '${message.serverId}' AND channel_id = '${args[0]}'`,
				subcmdRemoveSql,
				tableColumn,
			);
			break;
		case 'update':
			command.editType(
				message,
				false,
				'The channel could not be updated as it doesn\'t exist.',
				`UPDATE rp_channel SET channel_name = '${args[0]} WHERE server_id = ${message.serverId}' AND channel_id = '${message.channelId}'`,
				viewSql,
				tableColumn,
			);
			break;
		case 'view':
			command.infoView(message, viewSql);
			break;
		default:
			return message.reply('You need to use a valid subcommand');
		}
	},
};