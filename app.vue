<template>
  <div class="p-8">
    <!-- <NuxtWelcome /> -->

    <div v-for="tweet in tweetsHtml">
      <div class="mb-6" v-if="tweet.length" v-html="tweet"></div>
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
  padding: 2rem;
  border: 1px solid rgb(234, 234, 234);
  border-radius: 1rem;
}
.tweet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tweet-author {
  display: flex;
  align-items: center;
}
.tweet-author-image {
  width: 48px;
  height: 48px;
  border-radius: 9999px;
}
.tweet-author-info {
  margin-left: 1rem;
}
.tweet-author-name {
  font-weight: 500;
}
.tweet-author-handler {
  line-height: 1.4rem;
  color: var(--primary);
}
.tweet-logo {
  color: var(--primary);
}
.tweet-content {
  margin-top: 1rem;
}
.tweet-content a {
  color: var(--primary);
}
</style>
