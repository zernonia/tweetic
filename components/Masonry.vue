<script setup lang="ts">
import { PropType } from "vue"
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
const { urls, columnWidth, options } = toRefs(props)
const colGroup = ref<string[][]>([])

function columnCount(): number {
  const count = Math.floor((el.value?.getBoundingClientRect().width + 16) / (columnWidth.value + 16))
  return count > 0 ? count : 1
}

function createColumns(count: number): string[][] {
  return [...new Array(count)].map(() => [])
}
let ssrColumns = 3
const newColumns = createColumns(ssrColumns)
urls.value.forEach((_: string, i: number) => newColumns[i % ssrColumns].push(_))
colGroup.value = newColumns

async function fillColumns(itemIndex: number) {
  if (itemIndex >= urls.value.length) {
    return
  }
  await nextTick()
  const columnDivs = [...el.value.children] as HTMLDivElement[]
  const target = columnDivs.reduce((prev, curr) =>
    curr.getBoundingClientRect().height < prev.getBoundingClientRect().height ? curr : prev
  )
  colGroup.value[+target.dataset.index!].push(urls.value[itemIndex])
  await fillColumns(itemIndex + 1)
}

const redraw = async () => {
  colGroup.value = createColumns(columnCount())
  const scrollY = window.scrollY
  await fillColumns(0)
  window.scrollTo({ top: scrollY })
}

watch([width, urls, columnWidth, options], (n) => {
  redraw()
})
</script>

<template>
  <div ref="el" class="masonry flex mt-4 gap-4 w-full justify-center">
    <div v-for="(group, groupIndex) in colGroup" :data-index="groupIndex" class="flex flex-col gap-4 h-min">
      <div v-for="(url, index) in group" :key="url.toString() + index">
        <slot :url="url" :options="options" :index="index" />
      </div>
    </div>
  </div>
</template>
