const { query } = require('express-validator')

module.exports = [
  query('url')
    .not().isEmpty()
    .matches(/(https?:\/\/)([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/)
    .withMessage('url not valid'),
  query('url')
    .matches(/[^\/]$/)
    .withMessage('delete trailing slash "/"'),
]
