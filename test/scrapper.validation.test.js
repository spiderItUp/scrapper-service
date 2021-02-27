process.env.NODE_ENV = 'test'

const request = require('supertest')
const { createToken } = require('./helpers')

describe('validation tests for scrapper service', () => {
  let server
  beforeEach(() => {
    delete require.cache[require.resolve('../server')]
    // eslint-disable-next-line global-require
    server = require('../server')
  })
  afterEach(async () => {
    await server.close()
  })

  it('validates url on POST /scrape', async () => request(server)
    .post('/scrape')
    .send({ url: 'hello', deep: 3 })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))

  it('validates url empty on POST /scrape', async () => request(server)
    .post('/scrape')
    .send({ url: '', deep: 3 })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))

  it('validates deep on POST /scrape', async () => request(server)
    .post('/scrape')
    .send({ url: 'https://www.google.com', deep: 'hola' })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))

  it('validates url with no trailing slash on POST /scrape', async () => request(server)
    .post('/scrape')
    .send({ url: 'https://www.google.com/', deep: 2 })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))

  it('validates page on GET /', async () => request(server)
    .get('/')
    .query({ page: 'a' })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))

  it('validates limit on GET /', async () => request(server)
    .get('/')
    .query({ limit: 'a' })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))

  it('validates url ending on / on GET /baseUrl', async () => request(server)
    .get('/baseUrl')
    .query({ url: 'http://www.google.com/' })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))

  it('validates bad url on GET /baseUrl', async () => request(server)
    .get('/baseUrl')
    .query({ url: 'h://www.google.com' })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422))
})
