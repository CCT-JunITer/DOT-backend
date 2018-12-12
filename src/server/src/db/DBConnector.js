const mariadb = require('mariadb')
const readFiles = require('../helpers/helpers')
const fs = require('fs')
const path = require('path')

class DBConnector {
	constructor() {
		console.log({host: process.env.DB_HOST, 
									 user: process.env.DB_USER, 
									 password: fs.readFileSync(process.env.DB_PASSWORD, 'utf8').trim(), 
									 port: process.env.DB_PORT,
									 database: process.env.DB_DATABASE,
									 connectionLimit: 5})
		this.pool = mariadb.createPool({host: process.env.DB_HOST, 
									 user: process.env.DB_USER, 
									 password: fs.readFileSync(process.env.DB_PASSWORD, 'utf8').trim(), 
									 port: process.env.DB_PORT,
									 database: process.env.DB_DATABASE,
									 connectionLimit: 5})
		this.queries = {'get': readFiles(path.join(__dirname, './sql/get/')),
						'post': readFiles(path.join(__dirname, './sql/post/'))}
	}

	async get(sql) {
		try {
			const rows = await this.pool.query(this.queries.get[sql])
			console.log(rows)
			return rows
		} catch (err) {
			throw err;
		}
	}

	async put(sql, values) {
		try {
			const rows = await pool.query(this.queries.post[sql], values)
			console.log(rows)
			return rows
		} catch (err) {
			throw err;
		}
	}
}

module.exports = DBConnector