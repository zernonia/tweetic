<script setup lang="ts">
import { toRefs, computed } from "vue"
import { TweetOptions } from "~~/interface"
import { useFetchStaticTweet } from "../composables/fetch"

const props = defineProps({
  url: String,
  layout: { type: String, default: "" },
  css: { type: String, default: "" },
  show_original_link: { type: Boolean, default: false },
  enable_twemoji: { type: Boolean, default: true },
})

const { url } = toRefs(props)
const option = computed<TweetOptions>(() => ({
  layout: props.layout,
  css: props.css,
  show_original_link: props.show_original_link,
  enable_twemoji: props.enable_twemoji,
}))

const { data } = useFetchStaticTweet(url, option)
</script>

<template>
  <div v-if="data?.html?.length" v-html="data.html"></div>
</template>
