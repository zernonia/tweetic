import { TweetOembed } from "~~/interface"

export default defineEventHandler(async (event) => {
  const { url } = useQuery(event)
  const data = await $fetch<TweetOembed>(`https://publish.twitter.com/oembed?url=${url}`)
  const result = await $fetch("/api/crawler", { method: "POST", body: data.html })
  return { data, result }
})
