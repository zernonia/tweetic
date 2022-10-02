<script setup lang="ts">
const { $hljs } = useNuxtApp();

const tweetRef = ref();
const tabSelected = ref(0);
const params = ref({
  url: "https://twitter.com/zernonia/status/1524620865987506176",
  layout: "",
  css: "tailwind",
  enable_twemoji: true,
  show_media: true,
  show_quoted_tweet: true,
  show_info: true,
});

const highlightResponse = computed(() =>
  tweetRef.value?.data
    ? $hljs.highlight(JSON.stringify(tweetRef.value?.data, null, 2), {
        language: "json",
        ignoreIllegals: false,
      }).value
    : ""
);

const setTab = (index: number) => {
  tabSelected.value = index;
};

const urlWithParams = computed(() => {
  const genParams = Object.assign({}, params.value);
  delete genParams.url;
  
  // @ts-ignore
  const query = `?` + new URLSearchParams(genParams).toString();
  return `https://tweetic.io/api/tweet${query}`;
});
</script>

<template>
  <DocsBase
    method="GET"
    :url="urlWithParams"
    description="Obtain static tweets"
  >
    <template #config>
      <label for="url">URL</label>
      <input type="text" name="url" id="url" v-model="params.url" />
      <label class="mt-2" for="layout">
        Layout <span class="description"> ("" | "supabase")</span>
      </label>
      <select v-model="params.layout" name="layout" id="layout">
        <option value="">Default</option>
        <option value="supabase">Supabase</option>
      </select>
      <label class="mt-2" for="css">
        CSS <span class="description"> ("" | "tailwind")</span>
      </label>
      <select v-model="params.css" name="css" id="css">
        <option value="">Default CSS</option>
        <option value="tailwind">Tailwind</option>
      </select>

      <Toggle
        class="mt-2"
        name="enable_twemoji"
        v-model="params.enable_twemoji"
      >
        Enable Twemoji
      </Toggle>
      <Toggle class="mt-2" name="show_media" v-model="params.show_media">
        Show Media
      </Toggle>
      <Toggle
        class="mt-2"
        name="show_quoted_tweet"
        v-model="params.show_quoted_tweet"
        >Show Quoted Tweet</Toggle
      >
      <Toggle class="mt-2" name="show_info" v-model="params.show_info"
        >Show Info</Toggle
      >
    </template>

    <template #result>
      <p>
        html - <span class="description">HTML that is ready to render</span>
      </p>
      <p>meta - <span class="description">Meta data from Twitter</span></p>
    </template>

    <template #preview>
      <ul class="flex mb-3 text-xs">
        <li
          :class="[
            tabSelected === 0
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 hover:bg-blue-500 hover:bg-opacity-50 hover:text-white',
          ]"
          class="px-4 py-2 rounded-l-md cursor-pointer transition"
          @click="setTab(0)"
        >
          Preview
        </li>
        <li
          :class="[
            tabSelected === 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 hover:bg-blue-500 hover:bg-opacity-50 hover:text-white',
          ]"
          class="px-4 py-2 rounded-r-md cursor-pointer transition"
          @click="setTab(1)"
        >
          Response
        </li>
      </ul>
      <div v-show="tabSelected === 0" class="flex justify-center">
        <Tweet ref="tweetRef" v-bind="params"></Tweet>
      </div>
      <pre
        v-show="tabSelected === 1"
        class="overflow-x-scroll text-gray-400 mt-4 text-sm h-[95%]"
        v-html="highlightResponse"
      />
    </template>
  </DocsBase>
</template>
