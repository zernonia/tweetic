import { TweetOembed, TweetOptions } from "~~/interface"
import { constructHtml } from "../_lib/parser"

export default defineEventHandler(async (event) => {
  const { url, style } = useQuery(event)
  const oembed = await $fetch<TweetOembed>(`https://publish.twitter.com/oembed?url=${url}`)

  const options: TweetOptions = { style: style?.toString() }
  const html = constructHtml(oembed, options)

  return {
    html,
    oembed,
  }
})
