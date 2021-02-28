const Url = require('../models/scrapper')
const errorHandler = require('../utils/errorHandler')
const spider = require('../scripts/spider')
const ScrapperApi = require('../api/scrapper')

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
      const urls = await spider({ baseUrl: url, step: deep })

      // save into db
      const rp = await Url.findOne({ baseUrl: url }).lean()
      if (rp) {
        rp.urls = Array.from(new Set([...rp.urls, ...urls]))
        await Url.updateOne({ baseUrl: url }, rp)
      } else await Url.create({ baseUrl: url, urls })

      // get urls statuses
      const urlArr = urls.reduce((acc, current) => {
        acc.push(ScrapperApi.getStatusOfAny({ url: current }))
        return acc
      }, [])
      const urlArrRp = await Promise.all(urlArr)
      const urlArrStatus = urlArrRp.reduce((acc, current, i) => {
        acc.push({ url: urls[i], status: urlArrRp[i].status })
        return acc
      }, [])

      return res.status(200).json({ success: true, data: urlArrStatus })
    } catch (e) {
      console.log(e)
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
      const { page, limit = 10000 } = req.query

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
