const fetch = require('isomorphic-unfetch')
const errorHandler = require('../utils/errorHandler')

const ScrapperFactory = () => {
  /**
 *
 * @param {*} req
 * @param {*} res
 * @param {Date} req.query.startDate
 * @param {Date} req.query.endDate
 * @param {Date} req.query.provider
 */
  const all = async (req, res) => {
    // eslint-disable-next-line no-useless-escape
    const regexp = /href=\"(.+?)\"/gm
    try {
      const { url, deep } = req.body
      const page = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const txtPage = await page.text()
      const urlMatches = txtPage.match(regexp)

      return res.status(200).json({ success: true, data: urlMatches })
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  return {
    all,

  }
}

module.exports = ScrapperFactory
