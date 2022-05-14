<script setup lang="ts">
const props = defineProps({
  url: String,
  layout: { type: String, default: "" },
  css: { type: String, default: "" },
  showLink: { type: Boolean, default: true },
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

defineExpose({ data })
</script>

<template>
  <div v-if="data?.html?.length" v-html="data.html"></div>
</template>
