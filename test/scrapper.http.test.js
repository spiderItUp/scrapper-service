process.env.NODE_ENV = 'test'

const request = require('supertest')
const { createToken } = require('./helpers')

describe('http tests for scrapper service', () => {
  let server
  beforeEach(() => {
    delete require.cache[require.resolve('../server')]
    // eslint-disable-next-line global-require
    server = require('../server')
  })
  afterEach(async () => {
    await server.close()
  })

  it('aee on POST /scrape', async () => {
    console.log('h')
    // await Promise.all([
    //   helpers.createAuth(), helpers.createAuth({ userId: 'root', password: 'root' }),
    // ])
    return request(server)
      .post('/scrape')
      // .send({ url: 'http://localhost:3005', deep: 5 })
      .send({ url: 'http://localhost:3005', deep: 3 })
      .set('Authorization', `bearer ${createToken()}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => console.log(res.body))
    //   .expect((res) => { if (!res.body.success) { throw new Error('login status is false') } })
    //   .expect((res) => { if (!res.body.token) { throw new Error('token not provided') } })
      .expect(200)
  })

  //   it('login fails when userId is incorrect on POST /login', async () => {
  //     await Promise.all([
  //       helpers.createAuth(), helpers.createAuth({ userId: 'userId|507f191e810c19729d554rea', password: '3343' }),
  //     ])
  //     return request(server)
  //       .post('/login')
  //       .send({ userId: 'userId|507f191e810c19729d500000', password: '3343' })
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(400)
  //   })

//   it('login fails when password is incorrect on POST /login', async () => {
//     await Promise.all([
//       helpers.createAuth(), helpers.createAuth({ userId: 'userId|507f191e810c19729d554rea', password: '3343' }),
//     ])
//     return request(server)
//       .post('/login')
//       .send({ userId: 'userId|507f191e810c19729d554rea', password: '3398' })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(400)
//   })
})
