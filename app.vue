<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <blockquote class="twitter-tweet">
      <p lang="en" dir="ltr">
        Introducing SupaDB!! 🟡 -<br />my
        <a href="https://twitter.com/supabase?ref_src=twsrc%5Etfw">@supabase</a> Hackathon submission<br /><br />It lets
        you try out the beauty of Supabase REST API, and the latest Graphql without spinning up a db and seeding it.<br /><br />or
        you want to improve your design skill as webdev? feel free to use this 😉<a href="https://t.co/bkfeBtc0hi"
          >https://t.co/bkfeBtc0hi</a
        >
      </p>
      &mdash; Zernonia (@zernonia)
      <a href="https://twitter.com/zernonia/status/1512621505527484419?ref_src=twsrc%5Etfw">April 9, 2022</a>
    </blockquote>
    <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></Script>
  </div>
</template>

<script setup lang="ts">
const tweets = ["https://twitter.com/zernonia/status/1512621505527484419"]
onMounted(async () => {
  tweets.forEach(async (tweet) => {
    const data = await $fetch(`/api/tweet?url=${tweet}`)
    console.log({ data })
  })
})
</script>
