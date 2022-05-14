<script setup lang="ts">
const params = ref({
  url: "https://twitter.com/zernonia/status/1524620865987506176",
  layout: "supabase",
  css: "tailwind",
})

const { $hljs } = useNuxtApp()
const tweetRef = ref()
const highlightResponse = computed(() =>
  tweetRef.value?.data
    ? $hljs.highlight(JSON.stringify(tweetRef.value.data, null, "  "), { language: "json", ignoreIllegals: false })
        .value
    : ""
)
</script>

<template>
  <div class="mt-20">
    <div class="relative flex items-center p-2 bg-light-600 rounded-xl">
      <div class="tag bg-blue-500 mr-4">GET</div>
      <div>https://tweetic.io/api/tweets</div>
      <span class="absolute text-sm text-gray-400 right-4 top-full md:top-auto">Obtain static tweets</span>
    </div>

    <div class="flex flex-col md:flex-row mt-12 md:space-x-6">
      <div class="md:w-1/2 flex flex-col">
        <div class="flex flex-col">
          <h4 class="text-xl font-semibold mb-4 text-gray-400">Query Params</h4>
          <label for="url">url</label>
          <input type="text" name="url" id="url" v-model="params.url" />
          <label class="mt-2" for="layout">layout <span class="description"> ("" | "supabase")</span></label>
          <select v-model="params.layout" name="layout" id="layout">
            <option value="">Default</option>
            <option value="supabase">Supabase</option>
          </select>
          <label class="mt-2" for="css">css <span class="description"> ("" | "tailwind")</span></label>
          <select v-model="params.css" name="css" id="css">
            <option value="">Default CSS</option>
            <option value="tailwind">Tailwind</option>
          </select>
        </div>

        <div class="flex flex-col">
          <h4 class="mt-20 text-xl font-semibold mb-4 text-gray-400">Results</h4>
          <div class="tag bg-green-500">200</div>

          <div class="mt-4">
            <p>html - <span class="description">HTML that are ready to render</span></p>
            <p>oembed - <span class="description">Oembed information from Twitter</span></p>
          </div>
        </div>
      </div>

      <div class="min-h-80 md:w-1/2 p-4 md:p-8 mt-4 md:mt-0 rounded-2xl bg-light-600">
        <div class="flex justify-center">
          <Tweet ref="tweetRef" v-bind="params"></Tweet>
        </div>
        <pre class="overflow-x-scroll text-gray-400 mt-4 text-sm" v-html="highlightResponse"></pre>
      </div>
    </div>
  </div>
</template>
