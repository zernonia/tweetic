import { TweetOembed, TweetOptions } from "~~/interface"
import { constructHtml } from "../_lib/parser"

export default defineEventHandler(async (event) => {
  const { url, layout, show_original_link, css } = useQuery(event)
  try {
    const oembed = await $fetch<TweetOembed>(`https://publish.twitter.com/oembed?url=${url}`)

    const options: TweetOptions = {
      layout: layout?.toString(),
      css: css?.toString(),
      show_original_link: !!show_original_link,
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
