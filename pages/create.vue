<script setup lang="ts">
import { useStorage } from "@vueuse/core"

const tweetsInput = useStorage("tweets", ["", "", "", "", ""])
const tweetsOptions = useStorage("tweets-options", { layout: "" })
</script>

<template>
  <div class="w-full">
    <h2 class="text-4xl font-bold text-center">Create static tweets</h2>

    <ClientOnly>
      <div class="flex mt-8">
        <div class="flex flex-col space-y-2">
          <h4>Tweets</h4>
          <template v-for="(tweet, index) in tweetsInput">
            <input class="px-4 py-2 rounded-lg w-128" type="text" v-model="tweetsInput[index]" />
          </template>
          <button @click="tweetsInput.push('')" class="bg-light-500 px-4 py-2 rounded-lg">+</button>
        </div>

        <div class="ml-6 w-1/5 flex flex-col">
          <h4>Option</h4>
          <label for="layout">Layout</label>
          <select class="px-4 py-2 rounded-lg" v-model="tweetsOptions.layout" name="layout" id="layout">
            <option value="">Default</option>
            <option value="supabase">Supabase</option>
          </select>
        </div>
      </div>

      <hr class="my-20" />

      <div :key="tweetsOptions.layout">
        <template v-for="(tweet, index) in tweetsInput" :key="tweet">
          <Tweet v-if="tweet" :url="tweet" :layout="tweetsOptions.layout"></Tweet>
        </template>
      </div>
    </ClientOnly>
  </div>
</template>
