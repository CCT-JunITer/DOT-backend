const mariadb = require('mariadb')
const readFiles = require('../helpers/helpers')

class DBConnector {
	constructor() {
		this.pool = mariadb.createPool({host: process.env.DB_HOST, 
									 user: process.env.DB_USER, 
									 password:fs.readFileSync('/run/secrets/db_password'), 
									 port: process.env.DB_PORT, 
									 connectionLimit: 5})
		this.queries = {'get': readFiles('./queries/get/'),
						'post': readFiles('./queries/post/')}
	}

	async get(sql) {
		let conn
		try {
			conn = await pool.getConnection()
			const rows = await conn.query(this.queries.get[sql])
			console.log(rows)
		} catch (err) {
			throw err;
		} finally {
			if (conn) return conn.end();
		}
	}

	async put(sql, values) {
		let conn
		try {
			conn = await pool.getConnection()
			const res = await conn.query(this.queries.post[sql], values)
			console.log(res)
		} catch (err) {
			throw err;
		} finally {
			if (conn) return conn.end();
		}
	}
}

module.exports = DBConnector