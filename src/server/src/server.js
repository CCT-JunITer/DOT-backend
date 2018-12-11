"use strict";

const fs = require('fs')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const app = express()
const server = require('https').createServer({
			    					key: fs.readFileSync('/run/secrets/ssl_key'),
			    					cert: fs.readFileSync('/run/secrets/ssl_crt')
								}, app)
const io = require('socket.io')(server)

// set server middleware
app.use(helmet())
app.use(compression({level: 3}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.io = io
  next()
})
// Server setting
const PORT = process.env.PORT || 8080

// Configure router
app.use('/', require('./routes/routes'));

// exit strategy
process.on('SIGINT', async (err) => {  
    console.log('err')
    await pool.end()
})

server.listen(PORT, () => console.log(`API Server Started On Port ${PORT}!`))