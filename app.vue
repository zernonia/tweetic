<template>
  <div>
    <!-- <NuxtWelcome /> -->

    <div v-for="tweet in tweetsHtml">
      <div v-if="tweet.length" v-html="tweet"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tweets = [
  "https://twitter.com/zernonia/status/1512621505527484419",
  "https://twitter.com/supabase/status/1524055596395528194",
  "https://twitter.com/CloudflareDev/status/1524069279787847680",
]
const tweetsHtml = ref<string[]>([])
onMounted(async () => {
  tweets.forEach(async (tweet) => {
    const data = await $fetch("/api/tweet", {
      params: {
        url: tweet,
      },
    })
    console.log({ data })
    tweetsHtml.value.push(data.html)
  })
})
</script>

<style>
.tweet {
  width: 550px;
}
</style>
