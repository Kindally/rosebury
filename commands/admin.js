const { Command } = require('../utils/cmdClass');
const { dbCtrl } = require('../mysqldb/connectDB');

const command = new Command(
	'admin',
	'Add or remove users who can configure the bot',
	true,
);

Command.prototype.infoView = async function(message, sql) {
	const rows = await dbCtrl.view(sql);
	if (rows[0] === undefined) return 'There are no roleplaying channels to view.';
	const content = [];

	for (let i = 0; i < rows.length; i++) {
		content.push(`${rows[i].role_id}\n`);
	}

	const response = content.join('');
	return message.reply(response);
};

module.exports = {
	callback: async (message, userMessage) => {
		let access;
		if (command.admin) access = await command.cmdCtrl(message.member.isOwner, message.member.roleIds, message.authorId);
		if (!access) return message.reply('Only admins of this server can use this command');

		const [ , subcommand, ...args ] = userMessage;

		switch (subcommand) {
		case 'add':
			if (!args[0]) return message.reply('You need to specify a role id');
			command.editType(
				message,
				false,
				'The role could not be added.',
				`INSERT INTO admin (server_id, role_id) VALUES ('${message.serverId}', '${args[0]}')`,
				`SELECT * FROM admin WHERE server_id = '${message.serverId}' AND role_id = '${args[0]}'`,
			);
			break;
		case 'remove':
			if (!args[0]) return message.reply('You need to specify a role id');
			command.editType(
				message,
				true,
				'The role could not be removed',
				`DELETE FROM admin WHERE server_id = '${message.serverId}' AND role_id = '${args[0]}'`,
				`SELECT * FROM admin WHERE server_id = '${message.serverId}' AND role_id = '${args[0]}'`,
			);
			break;
		case 'view':
			await command.infoView(message, `SELECT * FROM admin WHERE server_id = '${message.serverId}'`);
			break;
		default:
			return message.reply('You need to use a subcommand.');
		}
	},
};