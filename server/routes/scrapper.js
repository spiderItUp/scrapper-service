const jwt = require('express-jwt')
const router = require('express').Router()
const config = require('../../config/env')
const ScrapperFactory = require('../handlers/scrapper')()

const scrapperValidator = require('./validation/scrapper')
const allValidator = require('./validation/all')
const getValidator = require('./validation/get')
const validationManager = require('./middleware/validationManager')

router.get('/baseUrl', jwt({ secret: config.JWT_SECRET, algorithms: ['HS256'] }), getValidator, validationManager, ScrapperFactory.get)
router.get('/', jwt({ secret: config.JWT_SECRET, algorithms: ['HS256'] }), allValidator, validationManager, ScrapperFactory.all)
router.post('/scrape', jwt({ secret: config.JWT_SECRET, algorithms: ['HS256'] }), scrapperValidator, validationManager, ScrapperFactory.scrape)

module.exports = router
