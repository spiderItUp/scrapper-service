process.env.NODE_ENV = 'test'

const request = require('supertest')
const { createToken } = require('./helpers')

describe('auth tests', () => {
  let server

  beforeEach(() => {
    delete require.cache[require.resolve('../server')]
    // eslint-disable-next-line global-require
    server = require('../server')
  })

  afterEach(async () => {
    await server.close()
  })

  it('fails when token is wrong on POST /scrape', async () => request(server)
    .post('/scrape')
    .set('Authorization', `bearer ${createToken()}88`)
    .set('Accept', 'application/json')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(401))

  it('fails when token is empty on POST /scrape', async () => request(server)
    .post('/scrape')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(401))

  it('fails when token is empty on GET /', async () => request(server)
    .get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(401))

  it('fails when token is empty on GET /baseUrl', async () => request(server)
    .get('/baseUrl?url=http://www.google.com')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(401))
})
