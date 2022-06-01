import { TweetOptions } from "~~/interface"
import { constructHtmlv2, getTweetContent } from "../../_lib/parserv2"

export default defineEventHandler(async (event) => {
  const { url, layout, css, enable_twemoji, show_media } = useQuery(event)
  const id = url.toString().split("/")[5]

  try {
    const options: TweetOptions = {
      layout: layout?.toString(),
      css: css?.toString(),
      enable_twemoji: enable_twemoji ? JSON.parse(enable_twemoji.toString()) : false,
      show_media: show_media ? JSON.parse(show_media.toString()) : false,
    }

    const data = await $fetch<{ [key: string]: string }>(`https://syndication.twitter.com/tweets.json?ids=${id}`)

    const tweetContent = getTweetContent(data, options)
    const html = constructHtmlv2(tweetContent, options)
    return { html, meta: tweetContent.meta }
  } catch (err) {
    event.res.statusCode = 400
    return { err }
  }
})
