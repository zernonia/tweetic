<script setup lang="ts">
import { PropType } from "vue"
import { chunk } from "lodash-es"
import { useCurrentElement } from "@vueuse/core"
import { useWindowSize } from "@vueuse/core"
import { TweetOptions } from "~~/interface"

const { width, height } = useWindowSize()
const el = useCurrentElement()
const props = defineProps({
  urls: {
    type: Object as PropType<string[]>,
    required: true,
  },
  columnWidth: {
    type: Number,
    default: 400,
  },
  options: {
    type: Object as PropType<TweetOptions>,
  },
})

const columnWidth = ref(1200)
const colGroup = ref<string[][]>()

const redraw = () => {
  columnWidth.value = el.value?.getBoundingClientRect().width ?? 1200

  let chunks = process.server ? 1 : Math.ceil(props.urls.length / Math.floor(columnWidth.value / props.columnWidth))
  colGroup.value = chunk(props.urls, chunks)
}
watch(width, () => {
  redraw()
})

redraw()
</script>

<template>
  <div class="flex mt-4 gap-4 w-full justify-center">
    <div v-for="group in colGroup" class="flex flex-col gap-4">
      <div v-for="url in group" :key="url.toString()">
        <Tweet class="flex justify-center" :url="url" v-bind="options"></Tweet>
      </div>
    </div>
  </div>
</template>
