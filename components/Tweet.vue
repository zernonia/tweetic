<script setup lang="ts">
const props = defineProps({
  url: String,
  layout: { type: String, default: "" },
  css: { type: String, default: "" },
  showLink: { type: Boolean, default: true },
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
  <div
    class="ring-0 hover:ring-2 ring-light-700 transition rounded-2xl cursor-pointer"
    @click="onClick"
    v-if="data?.html?.length"
    v-html="data.html"
  ></div>
</template>
