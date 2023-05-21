const mysql = require('mysql2');
const { db_host, db_name, db_user, db_pass } = require('../config.json');

const conn = mysql.createConnection({
	host: db_host,
	user: db_name,
	database: db_user,
	password: db_pass,
});
