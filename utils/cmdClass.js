const { dbCtrl } = require('../mysqldb/connectDB');
const { developer } = require('../config.json');

class Command {
	constructor(name, desc, dev, admin) {
		this.name = name;
		this.desc = desc;
		this.dev = dev;
		this.admin = admin;
	}

	async cmdCtrl(isOwner, memberRoleIds, authorId, serverId) {
		if (this.dev) {
			if (developer === authorId) return true;
			else return false;
		}
		else if (!isOwner && this.admin) {
			const rows = await dbCtrl.view(`SELECT * FROM admin WHERE server_id = '${serverId}'`);
			for (let i = 0; i < memberRoleIds.length; i++) {
				for (let j = 0; j < rows.length; j++) {
					console.log(`memberRoleIds: ${memberRoleIds[i]}, rows: ${rows[j].role_id}`);
					if (memberRoleIds[i] == rows[j].role_id) return true;
				}
			}
			return false;
		}
		else {
			return true;
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