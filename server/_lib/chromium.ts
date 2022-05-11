import core from "puppeteer-core"
import { getOptions } from "./options"
let _page: core.Page | null

export async function initPage() {
  if (_page) {
    return _page
  }
  const options = await getOptions()
  const browser = await core.launch(options)
  _page = await browser.newPage()

  return _page
}
