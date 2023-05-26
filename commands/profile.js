const { Command } = require('../utils/cmdClass');
const { dbCtrl } = require('../mysqldb/connectDB');

const command = new Command(
	'profile',
	'Add, update or remove character profiles',
	false,
);

Command.prototype.infoView = async function(sql) {
	const rows = await dbCtrl.view(sql);
	if (rows[0] === undefined) return 'There are no profiles to view.';
	const content = [];

	for (let i = 0; i < rows.length; i++) {
		if (rows[i].active === 1) {
			content.push(`**${rows[i].profile_name}**`);
		}
		else {
			content.push(`${rows[i].profile_name}`);
		}
	}

	const response = content.join(', ');
	return response;
};

module.exports = {
	callback: async (message, userMessage) => {
		const [ , subcmd, ...args ] = userMessage;

		switch (subcmd) {
		case 'view':
			const responseView = await command.infoView(
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}'`,
			);
			return message.reply(responseView);

		case 'add':
			if (!args[0]) return message.reply('You need to specify profile name.');
			const errMsg1 = await command.editType(
				`INSERT INTO profiles (server_id, user_id, profile_name) VALUES ('${message.serverId}', '${message.authorId}', '${args[0]}')`,
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}'`,
				false,
				true,
			);
			return message.reply(command.botReply(errMsg1, subcmd));

		case 'update':
			if (!args[1]) return message.reply('You need to specify old profile name and then the new profile name.');
			const errMsg2 = await command.editType(
				`UPDATE profiles SET profile_name = '${args[1]}' WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
				true,
				true,
			);
			return message.reply(command.botReply(errMsg2, subcmd));

		case 'remove':
			if (!args[0]) return message.reply('You need to specify profile name.');
			const errMsg3 = command.editType(
				`DELETE FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
				true,
				true,
			);
			return message.reply(command.botReply(errMsg3, subcmd));

		case 'activate':
			if (!args[0]) return message.reply('You need to specify profile name.');
			let errMsg4 = await command.editType(
				`UPDATE profiles SET active = 0 WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}'`,
				`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}'`,
				true,
				true,
			);
			if (errMsg4) {
				return message.reply(command.botReply(errMsg4, subcmd));
			}
			else {
				errMsg4 = await command.editType(
					`UPDATE profiles SET active = 1 WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
					`SELECT * FROM profiles WHERE server_id = '${message.serverId}' AND user_id = '${message.authorId}' AND profile_name = '${args[0]}'`,
					true,
					true,
				);
				return message.reply(command.botReply(errMsg4, subcmd));
			}
		default:
			return message.reply('You need to use a valid subcommand');
		}
	},
};