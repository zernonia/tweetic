<script setup lang="ts">
import { useStorage } from "@vueuse/core"
import { useClipboard } from "@vueuse/core"
import { obtainCss } from "~~/utils/function"
import { TweetOptions } from "~~/utils/types"
import { useToast } from "vue-toastification"

const toast = useToast()
const tweetsInput = useStorage("tweets", ["", "", "", "", ""])
const tweetsOptions = useStorage<TweetOptions>("tweets-options", {
  layout: "",
  css: "",
  show_original_link: false,
  enable_twemoji: true,
  show_media: true,
  show_quoted_tweet: true,
})
const exportOptions = useStorage("export-options", {})
const computedInput = computed(() => tweetsInput.value.filter((i) => i != ""))

const getTweetsHTML = () => {
  let tweets = document.querySelectorAll(".tweet-container")
  let innerHTMLs = ""
  tweets.forEach((i) => {
    innerHTMLs += i.innerHTML
  })
  return innerHTMLs
}

const { copy, copied } = useClipboard()
const copyTweet = async (url: string) => {
  let tweet = document.getElementById(`${url.split("/status/")[1]}`)
  let text = tweet.innerHTML
  try {
    await copy(text)
    toast.success("Copied Static Tweet")
  } catch (err) {
    toast.error("Something wrong...")
  }
}
const copyAll = async () => {
  let text = getTweetsHTML() + obtainCss(tweetsOptions.value)
  if (!text.length) return
  try {
    await copy(text)
    toast.success("Copied All Static Tweets")
  } catch (err) {
    toast.error("Something wrong...")
  }
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

const isModalOpen = ref(false)
const isPreviewingCSS = ref(false)
const openModal = () => {
  isModalOpen.value = true
}
const closeModal = (ev: boolean) => {
  isModalOpen.value = ev
  isPreviewingCSS.value = false
}
useCustomHead("Tweetic | Create now!", "Create your own static tweets now!")
</script>

<template>
  <div class="w-full">
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

            <Toggle class="mt-2" name="enable_twemoji" v-model="tweetsOptions.enable_twemoji"> Enable Twemoji </Toggle>
            <Toggle class="mt-2" name="show_media" v-model="tweetsOptions.show_media"> Show Media </Toggle>
            <Toggle class="mt-2" name="show_quoted_tweet" v-model="tweetsOptions.show_quoted_tweet">
              Show Quoted Tweet
            </Toggle>
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

      <Masonry
        :urls="computedInput"
        :options="tweetsOptions"
        :column-width="tweetsOptions.layout === 'supabase' ? 400 : 500"
      >
        <template v-slot="{ url, options }">
          <Tweet
            :id="url.split('/status/')[1]"
            @click="copyTweet(url)"
            class="tweet-container flex justify-center"
            :url="url"
            :redirect="false"
            v-bind="options"
          ></Tweet>
        </template>
      </Masonry>

      <Modal :open="isModalOpen" @close="closeModal">
        <div class="p-4 md:p-8 !pb-0 flex items-center justify-between">
          <h2 class="text-2xl md:text-4xl font-bold text-gray-300">Export</h2>
          <div class="flex items-center">
            <button
              v-if="tweetsOptions.css != 'tailwind'"
              @click="isPreviewingCSS = !isPreviewingCSS"
              class="btn btn-pale mr-2"
            >
              Switch to {{ isPreviewingCSS ? "HTML" : "CSS" }}
            </button>
            <button @click="copyAll" class="btn btn-primary">{{ copied ? "Copied" : "Copy All" }}</button>
          </div>
        </div>
        <div class="p-4 md:p-8 !pt-4 w-full h-full">
          <pre
            class="overflow-x-auto text-sm p-2 rounded-xl bg-light-400"
            v-html="
              isPreviewingCSS
                ? $hljs.highlight(obtainCss(tweetsOptions), { language: 'css' }).value
                : $hljs.highlight(getTweetsHTML(), { language: 'html' }).value
            "
          ></pre>
        </div>
      </Modal>
    </ClientOnly>
  </div>
</template>
