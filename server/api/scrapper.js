const fetch = require('isomorphic-unfetch')

const ScrapperApi = () => {
  const getPageTxt = async ({ url }) => fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return {
    getPageTxt,

  }
}

module.exports = ScrapperApi()
