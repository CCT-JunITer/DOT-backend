"use strict";

const express = require('express')
const router = express.Router();
const DBConnector = require('../sql/DBConnector')
const db = new DBConnector()

// Routes
router.get('/:endpoint', async (req, res, next) => {

})

router.post('/:endpoint', async (req, res, next) => {

	res.status(200)
})

module.exports = router