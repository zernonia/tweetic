<script setup lang="ts">
const props = defineProps({
  url: String,
})

const { data } = await useAsyncData(props.url, () =>
  $fetch("/api/tweet", {
    params: {
      url: props.url,
      style: "supabase",
    },
  })
)
</script>

<template>
  <div v-if="data?.html?.length" v-html="data.html"></div>
</template>
