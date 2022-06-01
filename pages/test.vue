<script setup lang="ts">
const { query } = useRoute()
const { data } = useFetch("/api/v2/tweet", { params: query })
</script>

<template>
  <div>
    <pre>
    {{ data }}
  </pre
    >
    <div v-html="data?.html"></div>
  </div>
</template>
