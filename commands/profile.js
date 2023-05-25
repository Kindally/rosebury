const { Command } = require('../utils/cmdClass');
const { dbCtrl } = require('../mysqldb/connectDB');

const command = new Command(
	'profile',
	'Add, update or remove character profiles',
	false,
);

Command.prototype.infoView = async function(message, sql) {
	const rows = await dbCtrl.view(sql);
	if (rows[0] === undefined) return 'There are no profiles to view.';
	const content = [];

	for (let i = 0; i < rows.length; i++) {
		content.push(`${rows[i].profile_name}\n`);
	}

	const response = content.join('');
	return message.reply(response);
};

module.exports = {
	callback: async (message, userMessage) => {
		const [ , subcmd, ...args ] = userMessage;

		switch (subcmd) {
		case 'view':
			await command.infoView(
				message,
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}'`,
			);
			break;
		case 'add':
			if (!args[0]) return message.reply('You need to specify profile name.');
			command.editType(
				message,
				false,
				'The profile could not be added.',
				`INSERT INTO profiles (server_id, user_id, profile_name) VALUES ('${message.serverId}', '${message.authorId}', '${args[0]}')`,
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}'`,
			);
			break;
		case 'update':
			if (!args[1]) return message.reply('You need to specify old profile name and then the new profile name.');
			command.editType(
				message,
				true,
				'The profile could not be updated.',
				`UPDATE profiles SET profile_name = '${args[1]}' WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
			);
			break;
		case 'remove':
			if (!args[0]) return message.reply('You need to specify profile name.');
			command.editType(
				message,
				true,
				'The profile could not be removed.',
				`DELETE FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
			);
			break;
		default:
			return message.reply('You need to use a valid subcommand');
		}
	},
};