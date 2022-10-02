<script setup lang="ts">
interface TweetProps {
  url: string
  redirect?: boolean
  layout?: string
  css?: string
  show_original_link?: boolean
  enable_twemoji?: boolean
  show_media?: boolean
  show_quoted_tweet?: boolean
  show_info?: boolean
}

const props = withDefaults(defineProps<TweetProps>(), {
  layout: "",
  css: "",
  enable_twemoji: true,
  show_media: false,
  show_quoted_tweet: false,
  show_info: false,
  redirect: true,
});

const { data, pending, error } = await useAsyncData(
  JSON.stringify(props),
  () =>
    $fetch("/api/tweet", {
      params: { ...props },
    }),
  { watch: [props] }
);

const onClick = () => {
  if (props.redirect) {
    window.open(props.url, "_blank");
  }
};

defineExpose({ data });
</script>

<template>
  <div class="relative">
    <div
      v-if="data !== null && data?.html?.length"
      class="ring-0 hover:ring-3 ring-blue-400 transition rounded-2xl cursor-pointer"
      v-html="data.html"
      @click="onClick"
    ></div>
    <div
      v-else-if="(pending || error) && data === null"
      class="absolute top-0 left-0 w-full h-full overflow-hidden"
    >
      <div class="tweet !h-full !w-full" :data-style="props.layout">
        <div class="flex items-center animate-pulse">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-light-600"></div>
            <div class="ml-4">
              <p class="w-16 h-4 bg-light-600"></p>
              <p class="w-16 h-4 mt-1 bg-light-600"></p>
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-col space-y-2 animate-pulse">
          <div class="w-full h-4 bg-light-600"></div>
          <div class="w-full h-4 bg-light-600"></div>
          <div class="w-full h-4 bg-light-600"></div>
          <div class="w-full h-4 bg-light-600"></div>
        </div>
      </div>
    </div>
  </div>
</template>
