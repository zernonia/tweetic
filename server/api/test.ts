import { extractTweetContent } from "../_lib/extractor"

export default defineEventHandler(async (event) => {
  const { url, layout, css, show_original_link, enable_twemoji } = useQuery(event)
  const id = url.toString().split("/")[5]

  const data = await $fetch<string>(`https://syndication.twitter.com/tweets.json?ids=${id}`)

  return { ...extractTweetContent(data, id), data }
})
