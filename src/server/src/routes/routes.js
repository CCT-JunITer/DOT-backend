"use strict";

const express = require('express')
const router = express.Router();
const DBConnector = require('../sql/DBConnector')
const db = new DBConnector()

router.use((req, res, next) => {
	if( ['users', 'events'].includes(req.params.endpoint) ) {
		next()
	}
	else {
		res.status(404).send('Invalid endpoint')
	}
})

// Routes
router.get('/:endpoint', async (req, res, next) => {
	res.status(200).send(db.get(req.param.endpoint))
})

router.post('/:endpoint', async (req, res, next) => {

	res.status(200).send(db.post(req.param.endpoint, req.body))
})

module.exports = router