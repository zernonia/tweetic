<script setup lang="ts">
import { PropType } from "vue"
import { chunk } from "lodash-es"
import { useCurrentElement } from "@vueuse/core"
import { useWindowSize } from "@vueuse/core"

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
})

const columnWidth = ref(1200)
const colGroup = computed(() => {
  let chunks = Math.ceil(props.urls.length / Math.floor(columnWidth.value / props.columnWidth))
  return chunk(props.urls, chunks)
})

watch(width, () => {
  columnWidth.value = el.value?.getBoundingClientRect().width
})
</script>

<template>
  <div class="flex mt-4 gap-4 w-full justify-center">
    <div v-for="group in colGroup" class="flex flex-col gap-4">
      <div :key="group.toString()" v-for="url in group">
        <slot :key="url" :url="url"></slot>
      </div>
    </div>
  </div>
</template>
