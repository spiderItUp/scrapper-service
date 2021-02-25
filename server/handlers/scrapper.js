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
    try {
      return res.send('works mate')
    } catch (e) {
      return errorHandler(res)
    }
  }

  return {
    all,

  }
}

module.exports = ScrapperFactory
