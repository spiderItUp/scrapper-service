const Url = require('../models/scrapper')
const errorHandler = require('../utils/errorHandler')
const spider = require('../scripts/spider')
/**
 * Scrapper factory handler
 */
const ScrapperFactory = () => {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {String} req.body.url - the site's url
   * @param {Number} req.body.deep - how many iterations down the tree is the algo going to do
  */
  const scrape = async (req, res) => {
    try {
      const { url, deep } = req.body
      const rp = await spider({ baseUrl: url, step: deep })

      // save into db
      await Url.create({ baseUrl: url, urls: rp })

      return res.status(200).json({ success: true, data: rp })
    } catch (e) {
      return errorHandler(res)
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  const all = async (req, res) => {
    try {
      const { page, limit = 10 } = req.query

      const rp = await Url.paginate({}, { page, limit, lean: true })
      const {
        totalDocs, hasPrevPage, hasNextPage, page: _page, totalPages, docs,
      } = rp
      return res.status(200).json({
        success: true, data: docs, page: _page, totalDocs, totalPages, hasNextPage, hasPrevPage,
      })
    } catch (e) {
      return errorHandler(res)
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  const get = async (req, res) => {
    const { url } = req.query
    try {
      const rp = await Url.findOne({ baseUrl: url }).lean().select({ urls: 1, _id: 0 })
      if (!rp) return res.status(400).json({ error: 'bad request', message: 'baseUrl does not exist in db' })
      return res.status(200).json({ success: true, data: rp })
    } catch (e) {
      return errorHandler(res)
    }
  }

  return {
    scrape,
    all,
    get,
  }
}

module.exports = ScrapperFactory
