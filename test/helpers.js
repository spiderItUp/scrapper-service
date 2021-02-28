const jsonwebtoken = require('jsonwebtoken')

const Url = require('../server/models/scrapper')

const createBaseUrl = async () => {
  const obj = [
    {
      baseUrl: 'https://www.google.com',
      urls: ['https://www.google.com/hola', 'https://www.google.com/bye'],
    },
    {
      baseUrl: 'https://www.youtube.com',
      urls: ['https://www.youtube.com/hola', 'https://www.youtube.com/bye'],
    },
  ]
  try {
    return await Url.create(obj)
  } catch (e) {
    console.log(e)
  }
}

// eslint-disable-next-line consistent-return
const removeBaseUrlAll = async () => {
  try {
    return await Url.deleteMany({})
  } catch (e) {
    console.log(e)
  }
}

const createToken = () => jsonwebtoken.sign({ name: 'alexis' }, process.env.JWT_SECRET)

module.exports = {
  createToken, createBaseUrl, removeBaseUrlAll,
}
