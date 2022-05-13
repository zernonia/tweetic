<script setup lang="ts">
const props = defineProps({
  url: String,
  layout: { type: String, default: "" },
  showLink: { type: Boolean, default: true },
})

const { data, pending } = await useAsyncData(
  JSON.stringify(props),
  () =>
    $fetch("/api/tweet", {
      params: {
        url: props.url,
        layout: props.layout,
        showLink: props.showLink,
      },
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
