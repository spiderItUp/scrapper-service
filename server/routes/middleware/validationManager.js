const { validationResult } = require('express-validator')

const validationManager = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(422).json({ error: 'validation failed', message: result.array() })
  }
  return next()
}

module.exports = validationManager
