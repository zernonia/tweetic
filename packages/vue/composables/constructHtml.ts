import { Ref } from "vue"
import { TweetOembed, TweetOptions } from "~~/interface"
import { constructHtml } from "~~/server/_lib/parser"
import { ref, watchEffect } from "vue"

export const useConstructHtml = (oembed: Ref<TweetOembed>, option: Ref<TweetOptions>) => {
  const data = ref()
  const pending = ref(false)

  watchEffect(async () => {
    pending.value = true
    if (oembed.value) {
      data.value = await constructHtml(oembed.value, option.value)
      pending.value = false
    }
  })

  return {
    pending,
    data,
  }
}
