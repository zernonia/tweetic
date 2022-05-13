<script setup lang="ts">
import { useStorage } from "@vueuse/core"
import { useClipboard } from "@vueuse/core"
import { obtainCss } from "~~/function"

const tweetsInput = useStorage("tweets", ["", "", "", "", ""])
const tweetsOptions = useStorage("tweets-options", { layout: "" })
const exportOptions = useStorage("export-options", { css: "" })
const computedInput = computed(() => tweetsInput.value.filter((i) => i != ""))

const contentRef = ref()
const tweetsRef = ref([])

const getTweetsHTML = () => {
  let tweets = document.querySelectorAll(".tweet-container")
  let innerHTML = ""
  tweets.forEach((i) => {
    innerHTML += i.innerHTML
  })
  return innerHTML
}

const { copy } = useClipboard()
const copyAll = () => {
  let text = getTweetsHTML() + obtainCss(tweetsOptions.value, exportOptions.value)
  if (!text.length) return
  copy(text)
}

const downloadAll = () => {
  let innerHTML = getTweetsHTML()
  if (!innerHTML.length) return
  const a = document.createElement("a")
  a.download = "download.html"
  a.href =
    "data:text/html;charset=UTF-8," +
    encodeURIComponent(getTweetsHTML()) +
    obtainCss(tweetsOptions.value, exportOptions.value)
  a.click()
  a.remove()
}

const isMounted = ref("false")
onMounted(() => {
  setTimeout(() => {
    isMounted.value = "true"
  }, 500)
})
useCustomHead("Tweetic | Create now!", "Create your own static tweets now!")
</script>

<template>
  <div class="w-full" :key="isMounted">
    <h2 class="text-3xl md:text-4xl font-bold text-center">Create static tweets</h2>
    <ClientOnly>
      <div class="flex flex-col md:flex-row mt-8 justify-center items-center md:items-stretch">
        <div class="flex flex-col space-y-2">
          <h4 class="text-xl mb-2 font-medium">Tweets</h4>
          <div class="md:w-128 flex items-center group" v-for="(tweet, index) in tweetsInput">
            <input
              placeholder="https://twitter.com/<user_name>/status/<tweet_id>"
              class="w-full"
              type="text"
              v-model="tweetsInput[index]"
            />
            <button
              class="p-3 h-full text-xs rounded-lg bg-light-300 transition text-light-300 group-hover:text-dark-800 hover:bg-light-500"
              @click="tweetsInput.splice(index, 1)"
            >
              ✗
            </button>
          </div>
          <button @click="tweetsInput.push('')" class="btn btn-pale md:w-120">+</button>
        </div>

        <div class="mt-12 md:mt-0 md:ml-6 flex flex-col justify-between">
          <div class="flex flex-col">
            <h4 class="text-xl mb-2 font-medium">Option</h4>
            <label for="layout">Layout</label>
            <select class="w-48" v-model="tweetsOptions.layout" name="layout" id="layout">
              <option value="">Default</option>
              <option value="supabase">Supabase</option>
            </select>
          </div>

          <div class="mt-20 flex flex-col">
            <h4 class="text-xl mb-2 font-medium">Export</h4>
            <label for="css">Stylesheet</label>
            <select class="w-48" v-model="exportOptions.css" name="css" id="css">
              <option value="">Default CSS</option>
              <option value="tailwind">TailwindCSS</option>
            </select>
            <div class="mt-2 flex space-x-2">
              <button @click="copyAll" class="btn btn-primary">Copy</button>
              <button @click="downloadAll" class="btn btn-primary">Download</button>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-10" />

      <h2 class="text-center text-3xl md:text-4xl font-bold">Preview</h2>

      <MasonryWall
        ref="contentRef"
        class="mt-8 flex flex-wrap justify-center"
        :key="tweetsOptions.layout"
        :items="computedInput"
        :column-width="tweetsOptions.layout === 'supabase' ? 400 : 500"
        :gap="10"
      >
        <template #default="{ item, index }">
          <Tweet ref="tweetsRef" class="tweet-container" :url="item" :layout="tweetsOptions.layout"></Tweet>
        </template>
      </MasonryWall>
    </ClientOnly>
  </div>
</template>

<style lang="postcss">
.masonry-item {
  @apply flex justify-center;
}
</style>
