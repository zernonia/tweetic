<script setup lang="ts">
const props = defineProps({
  url: String,
  layout: { type: String, default: "" },
  showLink: { type: Boolean, default: true },
})

const { data, pending } = await useAsyncData(props.url + props.layout, () =>
  $fetch("/api/tweet", {
    params: {
      url: props.url,
      layout: props.layout,
      showLink: props.showLink,
    },
  })
)

defineExpose({ data })
</script>

<template>
  <div v-if="data?.html?.length" v-html="data.html"></div>
</template>
