import { TweetOembed } from "~~/interface"
import { constructHtml } from "../_lib/parser"

export default defineEventHandler(async (event) => {
  const { url } = useQuery(event)
  const oembed = await $fetch<TweetOembed>(`https://publish.twitter.com/oembed?url=${url}`)

  const html = constructHtml(oembed)

  return {
    html,
    oembed,
  }
})
