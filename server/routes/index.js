const express = require('express')

const router = express.Router()

router.use('/', require('./scrapper'))

module.exports = router
