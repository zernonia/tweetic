<script setup lang="ts">
import { PropType } from "vue"
import { chunk } from "lodash-es"
import { useElementBounding } from "@vueuse/core"
import { TweetOptions } from "~~/interface"

const el = ref()
const { width } = useElementBounding(el)

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
const colGroup = ref<string[][]>([])

const { $device } = useNuxtApp()
const redraw = () => {
  columnWidth.value = el.value?.getBoundingClientRect().width ?? 1200
  let ssrChunk = $device?.isMobile ? 1 : $device?.isTablet ? 2 : $device?.isDesktop ? 2 : 2

  let chunks = process.server
    ? ssrChunk
    : Math.ceil(props.urls.length / Math.floor(columnWidth.value / props.columnWidth))
  if (Number.isFinite(chunks)) {
    colGroup.value = chunk(props.urls, chunks)
  }
}
watch(width, (n) => {
  redraw()
})
redraw()
</script>

<template>
  <div ref="el" class="masonry flex mt-4 gap-4 w-full justify-center">
    <div v-for="group in colGroup" class="flex flex-col gap-4">
      <div v-for="url in group" :key="url.toString()">
        <Tweet class="flex justify-center" :url="url" v-bind="options"></Tweet>
      </div>
    </div>
  </div>
</template>
