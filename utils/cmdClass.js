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
			return false;
		}
		else {
			return true;
		}
	}

	// updateCell allows the bot to update/remove the mysql row if true. Should not be used to allow to add row if it already exists
	// doIfExists allows the bot to run the code even if the mysql row already exists
	async editType(editSql, viewSql, updateRow = false, doIfExists = false) {
		const rows = await dbCtrl.view(viewSql);
		if ((rows[0] === undefined && updateRow) || (rows[0] !== undefined && !updateRow) || (rows[0] !== undefined && !doIfExists)) {
			return true;
		}
		else {
			dbCtrl.edit(editSql);
			return false;
		}
	}

	capName() {
		return this.name[0].toUpperCase() + this.name.substring(1);
	}

	botReply(isError, subcmd) {
		if (isError && subcmd.endsWith('e')) return `${this.capName()} failed to be ${subcmd}d.`;
		else if (isError) return `${this.capName()} failed to be ${subcmd}ed.`;
		else if (subcmd.endsWith('e')) return `${this.capName()} was successfully ${subcmd}d.`;
		else return `${this.capName()} was successfully ${subcmd}ed.`;
	}
}

module.exports = { Command };