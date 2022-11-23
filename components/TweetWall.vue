<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  urls: Object as PropType<string[]>,
  options: Object,
  isEditing: { type: Boolean, default: false },
});
const emits = defineEmits<{
  (e: "click-tweet", payload: string): void;
}>();

const sortedUrls = computed(() => {
  let col1: string[] = [];
  let col2: string[] = [];

  props.urls?.forEach((url, index) => {
    const col = index % 2;
    col == 0 ? col1.push(url) : col2.push(url);
  });

  return [...col1, ...col2];
});
</script>

<template>
  <div class="columns lg:columns-2 gap-6 mt-6">
    <Tweet
      v-for="url in sortedUrls"
      :id="url.split('/status/')[1]"
      class="tweet-container mb-6 flex justify-center"
      style="break-inside: avoid"
      @click="emits('click-tweet', url)"
      :url="url"
      :redirect="!isEditing"
      v-bind="options"
    ></Tweet>
  </div>
</template>
