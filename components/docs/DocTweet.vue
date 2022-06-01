<script setup lang="ts">
const params = ref({
  url: "https://twitter.com/zernonia/status/1524620865987506176",
  layout: "supabase",
  css: "tailwind",
  enable_twemoji: true,
  show_media: true,
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
  <DocsBase method="GET" url="https://tweetic.io/api/tweets" description="Obtain static tweets">
    <template #config>
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

      <Toggle class="mt-2" name="enable_twemoji" v-model="params.enable_twemoji"> enable_twemoji </Toggle>
      <Toggle class="mt-2" name="show_media" v-model="params.show_media"> show_media </Toggle>
    </template>

    <template #result>
      <p>html - <span class="description">HTML that are ready to render</span></p>
      <p>meta - <span class="description">Meta data from Twitter</span></p>
    </template>

    <template #preview>
      <div class="flex justify-center">
        <Tweet ref="tweetRef" v-bind="params"></Tweet>
      </div>
      <pre class="overflow-x-scroll text-gray-400 mt-4 text-sm" v-html="highlightResponse"></pre>
    </template>
  </DocsBase>
</template>
