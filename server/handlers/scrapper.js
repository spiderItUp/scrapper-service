/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const errorHandler = require('../utils/errorHandler')
const ScrapperApi = require('../api/scrapper')

/**
 * Scrapper factory handler
 */
const ScrapperFactory = () => {
  const getAllUrls = async ({
    baseUrl, page, deep, urlArr, deepCounter,
  }) => {
    // eslint-disable-next-line no-useless-escape
    const regexp1 = /href=\"(.+?)\"/gm
    const regexp2 = /href=\"(.+?)\"/

    const tempPage = page.match(/\/$/) ? page.slice(0, -1) : page

    urlArr = urlArr || []
    deepCounter = deepCounter || 1

    // console.log('pacor', tempPage)
    const rp = await ScrapperApi.getPageTxt({ url: tempPage })
    let txtPage = await rp.text()
    // console.log('charat', txtPage.slice(0, 10))
    txtPage = txtPage.match(regexp1) || []
    txtPage = txtPage.map((aPage) => aPage.match(regexp2)[1])
    let matchingUrls = txtPage ? Array.from(new Set(txtPage)) : []
    matchingUrls = matchingUrls.reduce((acc, current) => {
      // if (current.match(/^\/\//)) return acc
      // if (current.match(/\.(png|css)$/)) return acc
      // if (!current.match(/https?/)) return acc
      if (current.match(/^\//)) acc.push(baseUrl + current)

      else acc.push(current)
      return acc
    }, [])
    // eslint-disable-next-line no-param-reassign
    urlArr = [...urlArr, ...Array.from(new Set(matchingUrls))]
    // console.log(urlArr)
    console.log('m', matchingUrls, page)
    for (aPage of matchingUrls) {
      // if (deepCounter < deep) {
      await getAllUrls({
        baseUrl, page: aPage, deep, urlArr, deepCounter: deepCounter + 1,
      })
      // }
    }

    return urlArr
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {String} req.body.url - the site's url
   * @param {Number} req.body.deep - how many iterations down the tree is the algo going to do
  */
  const all = async (req, res) => {
    try {
      const { url: page, deep } = req.body
      const urlMatches = await getAllUrls({
        baseUrl: page, page, deep, urlArr: null, deepCounter: null,
      })
      console.log(urlMatches)

      // console.log('ieee', urlMatches, urlMatches.length)

      return res.status(200).json({ success: true, data: 'hola' })
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
