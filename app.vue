<template>
  <div>
    <!-- <NuxtWelcome /> -->

    <div v-for="tweet in tweetsHtml">
      <div v-if="tweet.length" v-html="tweet"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tweets = ["https://twitter.com/zernonia/status/1512621505527484419"]
const tweetsHtml = ref<string[]>([])
onMounted(async () => {
  tweets.forEach(async (tweet) => {
    const data = await $fetch(`/api/tweet?url=${tweet}`)
    console.log(data.parsedData)
    tweetsHtml.value.push(data.parsedData)
  })
})
</script>
