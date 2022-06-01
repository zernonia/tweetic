<script setup lang="ts">
// import { fetchTweetAst } from "static-tweets"
const { query } = useRoute()
const { data } = useFetch("/api/test", { params: query })
</script>

<template>
  <div>
    <pre>
    {{ data }}
  </pre
    >
    <div class="tweet tweet-content" v-html="data?.html"></div>
    <div class="tweet tweet-content" v-html="Object.values(data?.data)[0]"></div>
  </div>
</template>
