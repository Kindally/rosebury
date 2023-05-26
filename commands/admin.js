const { Command } = require('../utils/cmdClass');
const { dbCtrl } = require('../mysqldb/connectDB');

const command = new Command(
	'admin',
	'Add or remove users who can configure the bot',
	true,
);

Command.prototype.infoView = async function(sql) {
	const rows = await dbCtrl.view(sql);
	if (rows[0] === undefined) return 'There are no roleplaying channels to view.';
	const content = [];

	for (let i = 0; i < rows.length; i++) {
		content.push(`${rows[i].role_id}`);
	}

	const response = content.join('\n');
	return response;
};

module.exports = {
	callback: async (message, userMessage) => {
		let access;
		if (command.admin) access = await command.cmdCtrl(message.member.isOwner, message.member.roleIds, message.authorId);
		if (!access) return message.reply('Only admins of this server can use this command');

		const [ , subcmd, ...args ] = userMessage;

		switch (subcmd) {
		case 'add':
			if (!args[0]) return message.reply('You need to specify a role id');
			const errMsg1 = await command.editType(
				false,
				`INSERT INTO admin (server_id, role_id) VALUES ('${message.serverId}', '${args[0]}')`,
				`SELECT * FROM admin WHERE server_id = '${message.serverId}' AND role_id = '${args[0]}'`,
			);
			return message.reply(command.botReply(errMsg1, subcmd));

		case 'remove':
			if (!args[0]) return message.reply('You need to specify a role id');
			const errMsg2 = await command.editType(
				false,
				`DELETE FROM admin WHERE server_id = '${message.serverId}' AND role_id = '${args[0]}'`,
				`SELECT * FROM admin WHERE server_id = '${message.serverId}' AND role_id = '${args[0]}'`,
			);
			return message.reply(command.botReply(errMsg2, subcmd));

		case 'view':
			const responseView = await command.infoView(`SELECT * FROM admin WHERE server_id = '${message.serverId}'`);
			return message.reply(responseView);

		default:
			return message.reply('You need to use a subcommand.');
		}
	},
};