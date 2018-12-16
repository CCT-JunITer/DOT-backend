"use strict";

const express = require('express')

module.exports = function(db) {
	const router = express.Router();
	router.use('/:endpoint', async (req, res, next) => {
		if( db.getEndpoints(req.method.toLowerCase()).includes(req.params.endpoint) ) {
			next()
		}
		else {
			res.status(404).send(req.params.endpoint + ' is not a valid endpoint')
		}
	})

	// Routes
	router.get('/:endpoint', async (req, res, next) => {
		res.status(200).send(await db.get(req.params.endpoint))
	})

	router.post('/:endpoint', async (req, res, next) => {
		res.status(200).send(await db.post(req.params.endpoint, req.body))
	})

	router.post('/attendance', async (req, res, next) => {

	})

	return router
}