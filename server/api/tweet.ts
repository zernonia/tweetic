import { TweetOptions } from "~~/utils/types"
import { constructHtml, getSyndication, getTweetContent } from "../_lib/parser"

export default defineEventHandler(async (event) => {
  const { url, layout, css, enable_twemoji, show_media, show_quoted_tweet } = useQuery(event)
  const id = url.toString().split("/")[5]

  try {
    const options: TweetOptions = {
      layout: layout?.toString(),
      css: css?.toString(),
      enable_twemoji: enable_twemoji ? JSON.parse(enable_twemoji.toString()) : false,
      show_media: show_media ? JSON.parse(show_media.toString()) : false,
      show_quoted_tweet: show_quoted_tweet ? JSON.parse(show_quoted_tweet.toString()) : false,
    }
    const data = await getSyndication(id)
    const { html, meta } = constructHtml(data, options)
    return { html, meta }
  } catch (err) {
    event.res.statusCode = 400
    return { err }
  }
})
