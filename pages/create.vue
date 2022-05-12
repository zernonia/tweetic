<script setup lang="ts">
import { useStorage } from "@vueuse/core"
import { useClipboard } from "@vueuse/core"
import { obtainCss } from "~~/function"

const tweetsInput = useStorage("tweets", ["", "", "", "", ""])
const tweetsOptions = useStorage("tweets-options", { layout: "" })

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
  let text = getTweetsHTML()
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

useCustomHead("Tweetic | Create now!", "Create your own static tweets now!")
</script>

<template>
  <div class="w-full">
    <h2 class="text-3xl md:text-4xl font-bold text-center">Create static tweets</h2>
    <ClientOnly>
      <div class="flex flex-col md:flex-row mt-8 justify-center items-center">
        <div class="flex flex-col space-y-2">
          <h4 class="text-xl mb-2 font-medium">Tweets</h4>
          <div class="md:w-128 flex items-center" v-for="(tweet, index) in tweetsInput">
            <input
              placeholder="https://twitter.com/<user_name>/status/<tweet_id>"
              class="w-full"
              type="text"
              v-model="tweetsInput[index]"
            />
            <button
              class="px-3 h-full text-xs rounded-lg bg-light-300 transition hover:bg-light-500"
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

          <div class="mt-20 flex space-x-2">
            <button @click="copyAll" class="btn btn-primary">Copy</button>
            <button @click="downloadAll" class="btn btn-primary">Download</button>
          </div>
        </div>
      </div>

      <hr class="my-10" />

      <h2 class="text-center text-3xl md:text-4xl font-bold">Preview</h2>

      <div ref="contentRef" class="mt-8 flex flex-wrap justify-center" :key="tweetsOptions.layout">
        <template v-for="(tweet, index) in tweetsInput" :key="tweet">
          <Tweet
            ref="tweetsRef"
            class="tweet-container mr-4 mb-4"
            v-if="tweet"
            :url="tweet"
            :layout="tweetsOptions.layout"
          ></Tweet>
        </template>
      </div>
    </ClientOnly>
  </div>
</template>
