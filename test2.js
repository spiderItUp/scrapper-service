/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const ScrapperApi = require('./server/api/scrapper')

let urlArr = []
let urlPopArr = []

const regexp1 = /href=\"(.+?)\"/gm
const regexp2 = /href=\"(.+?)\"/

const baseUrl = 'http://localhost:3005'
const initStep = 1
const maxStep = 2

const getCleanUrl = async ({ url, step }) => {
  const rp = await ScrapperApi.getPageTxt({ url })
  let txtPage = await rp.text()

  txtPage = txtPage.match(regexp1) || []
  txtPage = txtPage.map((aPage) => aPage.match(regexp2)[1])

  let matchingUrls = txtPage ? Array.from(new Set(txtPage)) : []

  matchingUrls = matchingUrls.reduce((acc, current) => {
    if (current.match(/^\//)) current = baseUrl + current
    acc.push({ url: current, step: step + 1 })

    return acc
  }, [])

  urlArr = [...urlArr, ...matchingUrls]
  urlPopArr = [...urlPopArr, ...matchingUrls]
};

(async () => {
  await getCleanUrl({ url: baseUrl, step: initStep })

  const fn = async () => {
    while (urlPopArr.length > 0) {
      if (urlPopArr[0].step <= maxStep) {
        await getCleanUrl({ url: urlPopArr[0].url, step: urlPopArr[0].step })
      }
      urlPopArr.shift()
    }
    return urlArr
  }

  const a = await fn()
  console.log(a)
})()
