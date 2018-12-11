"use strict";

const fs = require('fs')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const https = require('https')

const server = express()

// set server middleware
server.use(helmet())
server.use(compression({level: 3}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// Server setting
const PORT = process.env.PORT || 8080

// set up sql queries
const queries = {

}

// Configure router
const router = express.Router();
server.use('/', router);

https.createServer({
			    key: fs.readFileSync('/run/secrets/ssl_key'),
			    cert: fs.readFileSync('/run/secrets/ssl_crt')
			}, server).listen(PORT, () => {
			    console.log(`API Server Started On Port ${PORT}!`)
			})


// Routes
router.get('/projects', async (req, res, next) => {

	res.status(200)
})

// exit strategy
process.on('SIGINT', async (err) => {  
    console.log('err')
    await pool.end()
})