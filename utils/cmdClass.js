const { dbCtrl } = require('../mysqldb/connectDB');

class Command {
	constructor(name, desc, admin) {
		this.name = name;
		this.desc = desc;
		this.admin = admin;
	}

	async cmdCtrl(isOwner, memberRoleIds, serverId) {
		if (!isOwner && this.admin) {
			const rows = await dbCtrl.view(`SELECT * FROM admin WHERE server_id = '${serverId}'`);
			for (let i = 0; i < memberRoleIds.length; i++) {
				for (let j = 0; j < rows.length; j++) {
					console.log(`memberRoleIds: ${memberRoleIds[i]}, rows: ${rows[j].role_id}`);
					if (memberRoleIds[i] == rows[j].role_id) return true;
				}
			}
		}
		return false;
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