import { TweetOembed } from "~~/interface"
import { extractHtml } from "../_lib/parser"

export default defineEventHandler(async (event) => {
  const { url } = useQuery(event)
  const data = await $fetch<TweetOembed>(`https://publish.twitter.com/oembed?url=${url}`)
  const parsedData = extractHtml(data.html)
  return { parsedData }
})
