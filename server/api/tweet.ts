import { TweetOembed, TweetOptions } from "~~/interface"
import { constructHtml } from "../_lib/parser"

export default defineEventHandler(async (event) => {
  const { url, layout, css, show_original_link, enable_twemoji } = useQuery(event)
  try {
    const oembed = await $fetch<TweetOembed>(`https://publish.twitter.com/oembed?url=${url}`)

    const options: TweetOptions = {
      layout: layout?.toString(),
      css: css?.toString(),
      show_original_link: show_original_link ? JSON.parse(show_original_link.toString()) : false,
      enable_twemoji: enable_twemoji ? JSON.parse(enable_twemoji.toString()) : false,
    }
    const html = await constructHtml(oembed, options)

    return {
      html,
      oembed,
    }
  } catch (err) {
    event.res.statusCode = 400
    return { err }
  }
})
