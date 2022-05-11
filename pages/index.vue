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

    <div
      class="flex flex-col items-center space-y-4 md:relative mt-32 w-full md:h-224 overflow-hidden xl:overflow-visible"
    >
      <Tweet
        class="md:absolute top-0 left-0"
        url="https://twitter.com/zernonia/status/1513020247690809346"
        layout="supabase"
      ></Tweet>
      <Tweet
        class="md:absolute right-0 -top-4"
        url="https://twitter.com/sudonymously/status/1521878033929539584"
      ></Tweet>
      <Tweet class="md:absolute left-1/3 top-40" url="https://twitter.com/supabase/status/1524055594587795456"></Tweet>
      <Tweet
        class="md:absolute -left-20 top-108"
        url="https://twitter.com/CodiferousCoder/status/1522233113207836675"
      ></Tweet>
      <Tweet
        class="md:absolute -right-1/10 top-48"
        url="https://twitter.com/OSSInsight/status/1524071559865937920"
        layout="supabase"
      ></Tweet>
      <Tweet
        class="md:absolute top-132 right-1/10"
        url="https://twitter.com/sweekiat_lim/status/1517707225430519809"
        layout="supabase"
      ></Tweet>
    </div>
  </div>
</template>
