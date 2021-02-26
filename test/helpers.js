const jsonwebtoken = require('jsonwebtoken')
const config = require('../config/env')

const createToken = () => jsonwebtoken.sign({ name: 'alexis' }, config.JWT_SECRET)

module.exports = {
  createToken,
}
