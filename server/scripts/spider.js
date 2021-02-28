/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const ScrapperApi = require('../api/scrapper')

let urlArr = []
let urlPopArr = []

const regexp1 = /href=\"(.+?)\"/gm
const regexp2 = /href=\"(.+?)\"/

const filter = ({ maxStep, baseUrl }) => {
  if (urlPopArr[0].step > maxStep) return false
  if (!urlPopArr[0].url.includes(baseUrl)) return false
  if (/^(#|tel:|mailto:)/.test(urlPopArr[0].url)) return false
  return true
}

/**
 *
 * @param {*} param0
 */
const getCleanUrl = async ({ url, step, baseUrl }) => {
  const rp = await ScrapperApi.getPageTxt({ url })
  let txtPage = await rp.text()

  txtPage = txtPage.match(regexp1) || []
  txtPage = txtPage.map((aPage) => aPage.match(regexp2)[1])

  let matchingUrls = txtPage ? Array.from(new Set(txtPage)) : []

  matchingUrls = matchingUrls.reduce((acc, current) => {
    if (/^(#|\/#|tel:|mailto:)/.test(current)) return acc
    if (current.match(/^\//)) current = baseUrl + current
    acc.push({ url: current, step: step + 1 })

    return acc
  }, [])

  urlArr = [...urlArr, ...matchingUrls]
  urlPopArr = [...urlPopArr, ...matchingUrls]
}

/**
 *
 * @param {*} param0
 */
const spider = async ({ baseUrl, step }) => {
  urlArr = []
  urlPopArr = []
  const initStep = 1
  const maxStep = step
  await getCleanUrl({ url: baseUrl, step: initStep, baseUrl })

  const fn = async () => {
    while (urlPopArr.length > 0) {
      if (filter({ baseUrl, maxStep })) {
        await getCleanUrl({ url: urlPopArr[0].url, step: urlPopArr[0].step, baseUrl })
      }
      urlPopArr.shift()
    }
    return urlArr
  }

  let rp = await fn()
  rp = rp.reduce((acc, current) => {
    acc.push(current.url)
    return acc
  }, [])
  return Array.from(new Set(rp))
}

module.exports = spider
