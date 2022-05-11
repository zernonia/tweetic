<script setup lang="ts">
import { useStorage } from "@vueuse/core"
import { useClipboard } from "@vueuse/core"
import { obtainCss } from "~~/function"

const tweetsInput = useStorage("tweets", ["", "", "", "", ""])
const tweetsOptions = useStorage("tweets-options", { layout: "" })

const contentRef = ref()
const tweetsRef = ref([])

const { text, copy, copied, isSupported } = useClipboard()
const copyAll = () => {
  copy(contentRef.value.innerHTML)
}

const downloadAll = () => {
  const a = document.createElement("a")
  a.download = "download.html"
  a.href =
    "data:text/html;charset=UTF-8," + encodeURIComponent(contentRef.value.innerHTML) + obtainCss(tweetsOptions.value)
  a.click()
  a.remove()
}
</script>

<template>
  <div class="w-full">
    <h2 class="text-4xl font-bold text-center">Create static tweets</h2>
    <ClientOnly>
      <div class="flex mt-8 justify-center">
        <div class="flex flex-col space-y-2">
          <h4>Tweets</h4>
          <template v-for="(tweet, index) in tweetsInput">
            <input class="px-4 py-2 rounded-lg w-128" type="text" v-model="tweetsInput[index]" />
          </template>
          <button @click="tweetsInput.push('')" class="bg-light-500 px-4 py-2 rounded-lg">+</button>
        </div>

        <div class="ml-6 flex flex-col">
          <h4>Option</h4>
          <label for="layout">Layout</label>
          <select class="px-4 py-2 rounded-lg w-48" v-model="tweetsOptions.layout" name="layout" id="layout">
            <option value="">Default</option>
            <option value="supabase">Supabase</option>
          </select>

          <button @click="copyAll" class="mt-20 btn btn-primary">Copy</button>
          <button @click="downloadAll" class="mt-2 btn btn-primary">Download</button>
        </div>
      </div>

      <hr class="my-10" />

      <h2 class="text-center text-4xl font-bold">Preview</h2>

      <div ref="contentRef" class="mt-8 flex flex-wrap justify-center" :key="tweetsOptions.layout">
        <template v-for="(tweet, index) in tweetsInput" :key="tweet">
          <Tweet ref="tweetsRef" class="mr-4 mb-4" v-if="tweet" :url="tweet" :layout="tweetsOptions.layout"></Tweet>
        </template>
      </div>
    </ClientOnly>
  </div>
</template>
