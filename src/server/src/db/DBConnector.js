const mariadb = require('mariadb')
const readFiles = require('../helpers/helpers')
const fs = require('fs')
const path = require('path')

class DBConnector {
	constructor() {
		this.pool = mariadb.createPool({host: process.env.DB_HOST, 
									 user: process.env.DB_USER, 
									 password: fs.readFileSync(process.env.DB_PASSWORD, 'utf8').trim(), 
									 port: process.env.DB_PORT,
									 database: process.env.DB_DATABASE,
									 connectionLimit: 5})
	}

	async loadEndpoints() {
				this.queries = {'get': await readFiles(path.join(__dirname, './sql/get/')),
								'post': await readFiles(path.join(__dirname, './sql/post/'))}
				return Promise.all(Object.values(this.queries))
	}

	async get(sql) {
		if (this.queries === undefined) 
			await this.loadEndpoints()

		console.log(this.queries.get[sql])
		try {
			const rows = await this.pool.query(this.queries.get[sql])
			return rows
		} catch (err) {
			throw err;
		}
	}

	async post(sql, values) {
		if (this.queries === undefined) 
			await this.loadEndpoints()

		try {
			const rows = await pool.query(this.queries.post[sql], values)
			return rows
		} catch (err) {
			throw err;
		}
	}

	getEndpoints(HTTPverb) {
		return HTTPverb === 'get' ? ['users', 'events'] : ['users', 'events']
	}
}

module.exports = DBConnector