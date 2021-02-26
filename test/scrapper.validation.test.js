process.env.NODE_ENV = 'test'

const request = require('supertest')
const { createToken } = require('./helpers')

describe('validation tests for scrapper service', () => {
  // eslint-disable-next-line global-require
  const server = require('../server')
  beforeEach(() => {

  })
  afterEach(async () => {
  })

  it('validates url on POST /scrape', async () => request(server)
    .post('/scrape')
    .send({ url: 'hello', deep: 3 })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))

  it('validates deep on POST /scrape', async () => request(server)
    .post('/scrape')
    .send({ url: 'https://www.google.com/', deep: 'hola' })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))
})
