"use strict";

const fs = require('fs')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const DBConnector = require('./db/DBConnector')
const db = new DBConnector()

const app = express()
const server = require('https').createServer({
			    					key: fs.readFileSync('/run/secrets/ssl_key'),
			    					cert: fs.readFileSync('/run/secrets/ssl_crt')
								}, app)
const io = require('socket.io')(server)

// set server middleware
app.use(helmet())
app.use(compression({level: 3}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('socketio', io);
// Server setting
const PORT = process.env.PORT || 8080

// Configure router
app.use('/', require('./routes/rest')(db));
require('./routes/socket')(io, db);

// exit strategy
process.on('SIGINT', async (err) => {  
    console.log('err')
})

server.listen(PORT, () => console.log(`API Server Started On Port ${PORT}!`))