<script setup lang="ts">
const props = defineProps({
  url: String,
  layout: { type: String, default: "" },
  css: { type: String, default: "" },
  show_original_link: { type: Boolean, default: false },
  enable_twemoji: { type: Boolean, default: true },

  redirect: { type: Boolean, default: true },
})

const { data, pending } = await useAsyncData(
  JSON.stringify(props),
  () =>
    $fetch("/api/tweet", {
      params: { ...props },
    }),
  {
    watch: [props],
  }
)

const onClick = () => {
  if (props.redirect) {
    window.open(props.url, "_blank")
  }
}
defineExpose({ data })
</script>

<template>
  <div class="relative overflow-hidden">
    <div
      class="ring-0 hover:ring-2 ring-light-700 transition rounded-2xl cursor-pointer"
      @click="onClick"
      v-if="data?.html?.length"
      v-html="data.html"
    ></div>
    <div v-if="pending" class="absolute top-0 left-0 w-full h-full">
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
