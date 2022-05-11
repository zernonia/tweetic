<script setup lang="ts">
const props = defineProps({
  url: String,
  layout: { type: String, default: "" },
})

const { data } = await useAsyncData(props.url, () =>
  $fetch("/api/tweet", {
    params: {
      url: props.url,
      style: props.layout,
    },
  })
)
</script>

<template>
  <div v-if="data?.html?.length" v-html="data.html"></div>
</template>
