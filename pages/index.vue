<script setup lang="ts"></script>

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
      <Tweet url="https://twitter.com/zernonia/status/1512621505527484419" layout="supabase"></Tweet>
      <Tweet url="https://twitter.com/supabase/status/1524055596395528194"></Tweet>
      <Tweet url="https://twitter.com/CloudflareDev/status/1524069279787847680"></Tweet>
      <Tweet url="https://twitter.com/supabase/status/1524055594587795456"></Tweet>
      <Tweet url="https://twitter.com/OSSInsight/status/1524071559865937920"></Tweet>
    </div>
  </div>
</template>
