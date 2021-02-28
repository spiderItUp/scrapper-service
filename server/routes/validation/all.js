const { query } = require('express-validator')

module.exports = [
  query('page')
    .optional()
    .isInt({ min: 0 })
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 0, max: 10000 })
    .toInt(),

]
