/* eslint-disable no-useless-escape */
const { body } = require('express-validator')

module.exports = [
  body('url')
    .matches(/(https?:\/\/)([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/).withMessage('url not valid')
    .matches(/[^\/]$/)
    .withMessage('delete trailing slash "/"'),
  body('deep').isInt({ min: 1 }).toInt().withMessage('deep not valid'),
]
