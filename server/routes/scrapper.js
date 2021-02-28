const jwt = require('express-jwt')
const router = require('express').Router()
const ScrapperFactory = require('../handlers/scrapper')()

const { JWT_SECRET } = process.env

const scrapperValidator = require('./validation/scrapper')
const allValidator = require('./validation/all')
const getValidator = require('./validation/get')
const validationManager = require('./middleware/validationManager')

router.get('/baseUrl', jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }), getValidator, validationManager, ScrapperFactory.get)
router.get('/', jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }), allValidator, validationManager, ScrapperFactory.all)
router.post('/scrape', jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }), scrapperValidator, validationManager, ScrapperFactory.scrape)

module.exports = router
