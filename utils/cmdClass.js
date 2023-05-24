const { dbCtrl } = require('../mysqldb/connectDB');
const { developer } = require('../config.json');

class Command {
	constructor(name, desc, dev, admin) {
		this.name = name;
		this.desc = desc;
		this.dev = dev;
		this.admin = admin;
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

	async editType(message, updateCell, errorMsg, editSql, viewSql) {
		const rows = await dbCtrl.view(viewSql);
		if ((rows[0] === undefined && updateCell) || (rows[0] !== undefined && !updateCell)) {
			return message.reply(errorMsg);
		}
		else {
			dbCtrl.edit(editSql);
			return message.reply(`The ${this.name} has successfully been updated.`);
		}
	}
}

module.exports = { Command };