const { Command } = require('../utils/cmdClass');
const { dbCtrl } = require('../mysqldb/connectDB');

const command = new Command(
	'settings',
	'Edits the bot settings of the server',
	true,
);

Command.prototype.infoView = async function (sql) {
	const rows = await dbCtrl.view(sql);
	const content = [];

	content.push(`Prefix: ${rows[0].prefix}`);
	content.push(`Experience rate: ${rows[0].experience_rate}`);

	const response = content.join('\n');
	return response;
};

module.exports = {
	callback: async (message, userMessage) => {
		let access;
		if (command.admin) access = await command.cmdCtrl(message.member.isOwner, message.member.roleIds, message.authorId);
		if (!access) return message.reply('Only admins of this server can use this command');

		const [, subcmd, ...args] = userMessage;

		switch (subcmd) {
			case 'prefix':
				if (!args[0]) return message.reply('You need to specify a new prefix');
				if (args[0].length > 3) return message.reply('The prefix is too long.');
				const errMsg1 = await command.editType(
					true,
					`UPDATE settings SET prefix = '${args[0]}' WHERE server_id = '${message.serverId}'`,
					`SELECT * FROM settings WHERE server_id = '${message.serverId}'`,
				);
				return message.reply(command.botReply(errMsg1, subcmd));

			case 'xprate':
				if (!args[0]) return message.reply('You need to specify a new prefix');
				const newRate = Number(args[0]);
				if (!Number.isInteger(newRate)) return message.reply('You need to specify a valid number');
				const errMsg2 = await command.editType(
					true,
					`UPDATE settings SET experience_rate = ${newRate} WHERE server_id = '${message.serverId}'`,
					`SELECT * FROM settings WHERE server_id = '${message.serverId}'`,
				);
				return message.reply(command.botReply(errMsg2, subcmd));

			case 'view':
				const response = await command.infoView(`SELECT * FROM settings WHERE server_id = '${message.serverId}'`);
				return message.reply(response);

			default:
				return message.reply('You need to use a valid subcommand');
		}
	},
}
