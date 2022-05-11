<script setup lang="ts">
const tweets = [
  { url: "https://twitter.com/zernonia/status/1512621505527484419", layout: "supabase" },
  { url: "https://twitter.com/supabase/status/1524055596395528194", layout: "" },
  { url: "https://twitter.com/supabase/status/1524055594587795456", layout: "" },
  { url: "https://twitter.com/OSSInsight/status/1524071559865937920", layout: "supabase" },
]
</script>

<template>
  <div class="mt-32 flex flex-col items-center">
    <h1 class="text-6xl leading-18 font-bold text-center">
      Convert Tweets to <br />
      Static HTML
    </h1>
    <h2 class="text-center mt-8 text-2xl text-gray-400">
      Create your testimonial wall statically and<br />
      style it however you want!
    </h2>

    <NuxtLink class="btn btn-primary text-xl mt-8" to="/create">Create now</NuxtLink>

    <div class="mt-32 flex flex-wrap space-x-4 space-y-4">
      <template v-for="tweet in tweets">
        <Tweet v-if="tweet.url" :url="tweet.url" :layout="tweet.layout"></Tweet>
      </template>
    </div>
  </div>
</template>
