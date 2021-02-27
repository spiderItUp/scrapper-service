/* eslint-disable no-await-in-loop */
const ScrapperApi = require('./server/api/scrapper')

let urlArr = []
let urlPopArr = []

const regexp1 = /href=\"(.+?)\"/gm
const regexp2 = /href=\"(.+?)\"/

const baseUrl = 'http://localhost:3005'

const getCleanUrl = async ({ url }) => {
  const rp = await ScrapperApi.getPageTxt({ url })
  let txtPage = await rp.text()

  txtPage = txtPage.match(regexp1) || []
  txtPage = txtPage.map((aPage) => aPage.match(regexp2)[1])

  let matchingUrls = txtPage ? Array.from(new Set(txtPage)) : []

  matchingUrls = matchingUrls.reduce((acc, current) => {
    if (current.match(/^\//)) acc.push(baseUrl + current)
    else acc.push(current)
    return acc
  }, [])

  urlArr = [...urlArr, ...matchingUrls]
  urlPopArr = [...urlPopArr, ...matchingUrls]
};

(async () => {
  await getCleanUrl({ url: baseUrl })

  const fn = async () => {
    while (urlPopArr.length > 0) {
      await getCleanUrl({ url: urlPopArr[0] })
      urlPopArr.shift()
    }
    return urlArr
  }

  const a = await fn()
  console.log(a)
})()
