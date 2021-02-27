/* eslint-disable guard-for-in */
/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const ScrapperApi = require('./server/api/scrapper')

/* eslint-disable no-param-reassign */
const fn = async ({ baseUrl, page, urlArr }) => {
  const regexp1 = /href=\"(.+?)\"/gm
  const regexp2 = /href=\"(.+?)\"/

  const rp = await ScrapperApi.getPageTxt({ url: page })
  let txtPage = await rp.text()

  txtPage = txtPage.match(regexp1) || []
  txtPage = txtPage.map((aPage) => aPage.match(regexp2)[1])

  let matchingUrls = txtPage ? Array.from(new Set(txtPage)) : []

  matchingUrls = matchingUrls.reduce((acc, current) => {
    if (current.match(/^\//)) acc.push(baseUrl + current)
    else acc.push(current)
    return acc
  }, [])

  urlArr = [...urlArr, ...Array.from(new Set(matchingUrls))]

  //   if (temparr.length === 0) return urlArr

  for (i in matchingUrls) {
    console.log(i)
    // if (i >= matchingUrls.length - 1) return urlArr
    return await fn({
      baseUrl, page: matchingUrls[i], urlArr, matchingUrls,
    })
  }

  return urlArr
};

(async () => {
  const baseUrl = 'http://localhost:3005'
  const a = await fn({
    baseUrl, page: baseUrl, urlArr: [], matchingUrls: [],
  })
  console.log(a)
})()
