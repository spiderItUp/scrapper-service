// eslint-disable-next-line global-require
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')

const routes = require('./server/routes')

const { TEST_PORT, NODE_ENV, DB_URL } = process.env
let { PORT, DB_NAME } = process.env

if (NODE_ENV === 'test') {
  PORT = TEST_PORT
  DB_NAME = 'test'
}

if (mongoose.connection.readyState === 0) {
  mongoose.connect(DB_URL, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, (error) => {
    if (error) throw error
    else console.log('Mongo DB connected')
  })
}

const server = express()

server.use(helmet())
server.use(cors())
server.use(logger('dev'))
server.use(bodyParser.json())
// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV !== 'test' ? require('morgan-body')(server) : null

server.use('/', routes)

const serverObj = server.listen(PORT, () => { console.log("Server listening in PORT ", PORT) }) /* eslint-disable-line */

module.exports = serverObj
