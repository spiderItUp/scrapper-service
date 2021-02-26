// eslint-disable-next-line global-require
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

let {
  PORT,
  TEST_PORT,
  DB_NAME,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
} = process.env

PORT = parseInt((PORT || '3000'), 10)
TEST_PORT = parseInt((TEST_PORT || '3000'), 10)
NODE_ENV = NODE_ENV || 'development'
DB_NAME = DB_NAME || 'test'
DB_URL = DB_URL || ''
JWT_SECRET = JWT_SECRET || 'secret'

module.exports = {
  PORT, TEST_PORT, DB_NAME, DB_URL, NODE_ENV, JWT_SECRET,
}
