<script setup lang="ts">
import { useElementBounding } from "@vueuse/core"
import type { TweetOptions } from "~~/utils/types"

interface MasonryProps {
  urls: string[]
  /**
   * Column Width 
   * 
   * @default 400
   */
  columnWidth?: number
  options?: TweetOptions
}

const el = ref()
const { width } = useElementBounding(el)

const props = withDefaults(defineProps<MasonryProps>(), {
  columnWidth: 400,
})

const { $device } = useNuxtApp()
const { urls, columnWidth, options } = toRefs(props)
const colGroup = ref<string[][]>([])

let ssrColumns = $device?.isMobile ? 1 : $device?.isTablet ? 2 : 3
const newColumns = createColumns(ssrColumns)
urls.value.forEach((_: string, i: number) => newColumns[i % ssrColumns].push(_))
colGroup.value = newColumns

function columnCount(): number {
  const count = Math.floor((el.value?.getBoundingClientRect().width + 16) / (columnWidth.value + 16))
  return count > 0 ? count : 1
}

function createColumns(count: number): string[][] {
  return [...new Array(count)].map(() => [])
}

async function fillColumns(itemIndex: number) {
  if (itemIndex >= urls.value.length) {
    return
  }
  await nextTick()
  const columnDivs = [...el.value?.children] as HTMLDivElement[]
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

watch([width, urls, columnWidth, options], () => redraw())

onMounted(() => {
  setTimeout(() => {
    redraw()
  }, 1000)
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
