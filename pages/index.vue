<script setup lang="ts"></script>

<template>
  <div class="mt-32 flex flex-col items-center overflow-hidden xl:overflow-visible">
    <h1 class="text-4xl md:text-7xl font-bold text-center">
      Convert Tweets to <br />
      Static HTML
    </h1>
    <h2 class="text-center mt-8 text-xl md:text-2xl text-gray-400">
      Create your testimonial wall statically and<br />
      style it however you want!
    </h2>

    <div class="md:text-xl mt-8 flex items-center flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
      <NuxtLink class="btn btn-primary" to="/create">Create now</NuxtLink>
      <a
        href="https://www.producthunt.com/posts/tweetic-io?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tweetic&#0045;io"
        target="_blank"
        ><img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=346188&theme=light"
          alt="Tweetic&#0046;io - Convert&#0032;Tweets&#0032;to&#0032;Static&#0032;HTML | Product Hunt"
          style="width: 240px; height: 48px"
          width="250"
          height="54"
      /></a>
    </div>

    <NuxtLink to="/thank-you" class="flex flex-col items-center mt-8 text-gray-400">
      <span>thank you everyone...</span>
      <Underline class="w-16 -mt-2"></Underline>
    </NuxtLink>

    <div class="flex flex-col items-center space-y-4 md:relative mt-8 md:mt-32 w-full md:h-224">
      <div class="md:absolute flex items-center -top-20 left-10 text-gray-400">
        <Arrow class="w-12"></Arrow>
        <span>Static HTML tweets</span>
      </div>
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
      <div class="md:absolute flex items-center left-1/2 top-26 text-gray-400">
        <span>Create manually or API</span>
        <Arrow class="w-12 transform rotate-180 mr-4"></Arrow>
      </div>

      <div class="md:absolute flex items-center top-84 left-36 text-gray-400">
        <Arrow class="w-12 transform rotate-20 mr-4"></Arrow>
        <span>Free & Open Source</span>
      </div>
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

      <div class="md:absolute flex items-center right-10 top-110 text-gray-400">
        <Arrow class="w-12 transform rotate-x-180 md:rotate-x-0 mr-4"></Arrow>
        <span>Custom CSS class for styling</span>
      </div>
    </div>
  </div>
</template>
