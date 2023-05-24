const { dbCtrl } = require('../mysqldb/connectDB');
const { developer } = require('../config.json');

class Command {
	constructor(name, desc, dev, admin) {
		this.name = name;
		this.desc = desc;
		this.dev = dev;
		this.admin = admin;
	}

	async infoView(message, sql) {
		const rows = await dbCtrl.view(sql);
		if (rows[0] === undefined) return 'There are no roleplaying channels to view.';
		const content = [];

		for (let i = 0; i < rows.length; i++) {
			content.push(`${rows[i].channel_name}: `);
			content.push(`${rows[i].channel_id}\n`);
		}
		const response = content.join('');
		return message.reply(response);
	}

	async cmdCtrl(message, isOwner, authorId) {
		if (this.dev) {
			if (developer !== authorId) return message.reply('Only devs can use this command');
		}
		else if (!isOwner && this.admin) {
			const rows = await dbCtrl.view(`SELECT * FROM admin WHERE admin_id = '${authorId}'`);
			if (!rows[0].admin_id) return message.reply('Only admins of this server can use this command');
		}
	}

	async editType(message, removeCell, errorMsg, editSql, viewSql) {
		const rows = await dbCtrl.view(viewSql);
		if ((rows[0] === undefined && removeCell) || (rows[0] !== undefined && !removeCell)) {
			return message.reply(errorMsg);
		}
		else {
			dbCtrl.edit(editSql);
			return message.reply(`The ${this.name} has successfully been updated.`);
		}
	}
}

module.exports = { Command };