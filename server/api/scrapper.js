const fetch = require('isomorphic-unfetch')

const ScrapperApi = () => {
  const getPageTxt = async ({ url }) => fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const getStatusOfAny = async ({ url }) => fetch(url, {
    method: 'GET',
    headers: {
      Accept: '*/*',
    },
  })

  return {
    getPageTxt, getStatusOfAny,

  }
}

module.exports = ScrapperApi()
