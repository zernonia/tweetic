import { Ref, computed } from "vue"
import { TweetOembed, TweetOptions } from "~~/interface"
import { useConstructHtml } from "./constructHtml"
import { useFetch } from "#app"

export const useFetchStaticTweet = (url: Ref<string>, option: Ref<TweetOptions>) => {
  const { data: oembed, pending: isFetchingOembed } = useFetch<TweetOembed>(
    `https://publish.twitter.com/oembed?url=${url.value}`
  )

  //@ts-ignore
  const { data: html, pending: isConstructingHtml } = useConstructHtml(oembed, option)

  const data = computed(() => ({ oembed: oembed.value, html: html.value }))
  const pending = computed(() => isFetchingOembed.value || isConstructingHtml)

  return {
    data,
    pending,
  }
}
