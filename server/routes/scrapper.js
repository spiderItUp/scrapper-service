const jwt = require('express-jwt')
const router = require('express').Router()
const config = require('../../config/env')
const ScrapperFactory = require('../handlers/scrapper')()

const scrapperValidator = require('./validation/scrapper')
const validationManager = require('./middleware/validationManager')

router.post('/scrape', jwt({ secret: config.JWT_SECRET, algorithms: ['HS256'] }), scrapperValidator, validationManager, ScrapperFactory.all)

module.exports = router
