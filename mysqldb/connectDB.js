const mysql = require('mysql2');
const { db_host, db_name, db_user, db_pass } = require('../config.json');

const dbCtrl = (() => {
	const con = mysql.createConnection({
		host: db_host,
		user: db_user,
		database: db_name,
		password: db_pass,
	});

	function edit(sql) {
		con.query(sql, function (err) {
			if (err) throw err;
		});
	}

	async function view(sql) {
		const [rows] = await con.promise().query(sql);
		return rows;
	}

	return {
		view,
		edit,
	};
})();

module.exports = { dbCtrl };
