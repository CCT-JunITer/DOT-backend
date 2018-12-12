"use strict";

const express = require('express')
const router = express.Router();
const DBConnector = require('../db/DBConnector')
const db = new DBConnector()

router.use('/:endpoint', (req, res, next) => {
	if( ['users', 'events'].includes(req.params.endpoint) ) {
		next()
	}
	else {
		res.status(404).send(req.params.endpoint + ' is not a valid endpoint')
	}
})

// Routes
router.get('/:endpoint', async (req, res, next) => {
	res.status(200).send(await db.get(req.param.endpoint))
})

router.post('/:endpoint', async (req, res, next) => {
	res.status(200).send(await db.post(req.param.endpoint, req.body))
})

router.post('/attendance', async (req, res, next) => {

})

module.exports = router