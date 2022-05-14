<script setup lang="ts">
import { useStorage } from "@vueuse/core"
import { useClipboard } from "@vueuse/core"
import { obtainCss } from "~~/function"

const tweetsInput = useStorage("tweets", ["", "", "", "", ""])
const tweetsOptions = useStorage("tweets-options", { layout: "", css: "" })
const exportOptions = useStorage("export-options", {})
const computedInput = computed(() => tweetsInput.value.filter((i) => i != ""))

const contentRef = ref()
const tweetsRef = ref([])

const tweetsCode = ref()
const getTweetsHTML = () => {
  let tweets = document.querySelectorAll(".tweet-container")
  let innerHTMLs = ""
  tweets.forEach((i) => {
    innerHTMLs += i.innerHTML
  })
  return innerHTMLs
}

const { copy, copied } = useClipboard()
const copyAll = () => {
  let text = getTweetsHTML() + obtainCss(tweetsOptions.value)
  if (!text.length) return
  copy(text)
}

const downloadAll = () => {
  let innerHTML = getTweetsHTML()
  if (!innerHTML.length) return
  const a = document.createElement("a")
  a.download = "download.html"
  a.href = "data:text/html;charset=UTF-8," + encodeURIComponent(getTweetsHTML()) + obtainCss(tweetsOptions.value)
  a.click()
  a.remove()
}

const isMounted = ref("false")
onMounted(() => {
  setTimeout(() => {
    isMounted.value = "true"
  }, 500)
})

const isModalOpen = ref(false)
const openModal = () => {
  isModalOpen.value = true
  tweetsCode.value = getTweetsHTML()
}
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

            <label class="mt-2" for="css">CSS</label>
            <select class="w-48" v-model="tweetsOptions.css" name="css" id="css">
              <option value="">Default CSS</option>
              <option value="tailwind">TailwindCSS</option>
            </select>
          </div>

          <div class="mt-20 flex flex-col">
            <div class="mt-2 flex space-x-2">
              <button @click="openModal" class="btn btn-primary">Preview Code</button>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-10" />

      <h2 class="text-center text-3xl md:text-4xl font-bold">Preview</h2>

      <MasonryWall
        ref="contentRef"
        class="mt-8 flex flex-wrap justify-center"
        :key="JSON.stringify(tweetsOptions)"
        :items="computedInput"
        :column-width="tweetsOptions.layout === 'supabase' ? 400 : 500"
        :gap="10"
      >
        <template #default="{ item, index }">
          <Tweet ref="tweetsRef" class="tweet-container" :url="item" v-bind="tweetsOptions"></Tweet>
        </template>
      </MasonryWall>

      <Modal :open="isModalOpen" @close="isModalOpen = $event">
        <div class="p-4 md:p-8 !pb-0 flex items-center justify-between">
          <h2 class="text-4xl font-bold text-gray-300">Export</h2>
          <button @click="copyAll" class="btn btn-primary">{{ copied ? "Copied" : "Copy All" }}</button>
        </div>
        <div class="p-4 md:p-8 !pt-4 w-full h-full">
          <pre
            class="overflow-x-auto text-sm p-2 rounded-xl bg-light-400"
            v-html="$hljs.highlight(tweetsCode, { language: 'html' }).value"
          ></pre>
        </div>
      </Modal>
    </ClientOnly>
  </div>
</template>
