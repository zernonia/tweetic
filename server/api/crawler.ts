import { initPage } from "../_lib/chromium"

export default defineEventHandler(async (event) => {
  const html = await useBody(event)
  var hrstart = process.hrtime()

  try {
    const page = await initPage()
    await page.setContent(`<body>${html}</body>`)
    const content = await page.waitForSelector("body")

    const imageBuffer = await content.screenshot({ omitBackground: true })

    return { imageBuffer }

    var hrend = process.hrtime(hrstart)
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000)
  } catch (err) {
    return {
      err,
    }
  }
})
