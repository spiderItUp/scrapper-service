process.env.NODE_ENV = 'test'

const request = require('supertest')
const { createToken } = require('./helpers')
const helpers = require('./helpers')

describe('http tests for scrapper service', () => {
  let server
  beforeEach(() => {
    delete require.cache[require.resolve('../server')]
    // eslint-disable-next-line global-require
    server = require('../server')
  })
  afterEach(async () => {
    helpers.removeBaseUrlAll()
    await server.close()
  })

  it('retrieve all baseUrls on GET /', async () => {
    await helpers.createBaseUrl()
    return request(server)
      .get('/')
      // .send({ url: 'http://localhost:3005', deep: 5 })
      .query({ limit: 10000 })
      .set('Authorization', `bearer ${createToken()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => { if (!res.body.data.length === 2) { throw new Error('no urls stored') } })
      .expect(200)
  })

  it('retrieve the urls by baseUrl on GET /baseUrl', async () => {
    await helpers.createBaseUrl()
    return request(server)
      .get('/baseUrl')
      .query({ url: 'https://www.youtube.com' })
      .set('Authorization', `bearer ${createToken()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => { if (!res.body.data.urls.length === 2) { throw new Error('no urls stored') } })
      .expect(200)
  })

  it('scrapes urls on POST /scrape', async () => request(server)
    .post('/scrape')
    // .send({ url: 'http://localhost:3005', deep: 5 })
    .send({ url: 'http://www.google.com', deep: 1 })
    .set('Authorization', `bearer ${createToken()}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => console.log(res.body.data))
    .expect(200))
})
