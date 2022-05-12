<script setup lang="ts">
//@ts-ignore
import Logo from "~~/assets/logo.svg"

useHead({
  title: "Tweetic | Convert Tweets to Static HTML ",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  link: [{ rel: "icon", href: "/logo.png" }],
  meta: [
    { name: "description", content: "Convert Tweets to Static HTML | Free • Open Source" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@zernonia" },
    { name: "twitter:title", content: "Tweetic | Convert Tweets to Static HTML" },
    {
      name: "twitter:description",
      content: "Convert Tweets to Static HTML | Free • Open Source",
    },
    { name: "twitter:image", content: "https://tweetic.io/og.png" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Tweetic | Convert Tweets to Static HTML" },
    { property: "og:url", content: "https://tweetic.io" },
    { property: "og:image", content: "https://tweetic.io/og.png" },
    {
      property: "og:description",
      content: "Convert Tweets to Static HTML | Free • Open Source",
    },
  ],
})
</script>

<template>
  <div class="p-4 md:p-8 w-full max-w-screen-xl">
    <div class="flex items-center justify-between mb-6">
      <NuxtLink to="/"><img :src="Logo" alt="tweetic logo" class="h-12 md:h-16" /></NuxtLink>

      <div class="flex items-center space-x-2">
        <NuxtLink class="btn btn-pale" target="_blank" to="https://github.com/zernonia/tweetic">GitHub</NuxtLink>
        <NuxtLink class="btn btn-primary" to="/create">Create</NuxtLink>
      </div>
    </div>

    <NuxtPage></NuxtPage>

    <div class="flex flex-col md:flex-row items-center justify-center mt-20 space-y-2 md:space-x-2 md:space-y-0">
      <p class="flex items-center w-max">
        Coded with 💙 <a class="ml-4" target="_blank" href="https://twitter.com/zernonia">by Zernonia</a>
      </p>

      <span class="hidden md:block">|</span>

      <a target="_blank" href="https://github.com/zernonia/tweetic">⭐️ GitHub</a>

      <span class="hidden md:block">|</span>

      <a href="https://www.buymeacoffee.com/zernonia" target="_blank"
        ><img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style="height: 32px !important; width: auto !important"
      /></a>
    </div>
  </div>
</template>

<style>
.tweet {
  width: 500px;
  padding: 2rem;
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--bg-primary);
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
  line-height: 1rem;
  font-weight: 500;
}
.tweet-author-handler {
  line-height: 1.8rem;
  color: var(--text-secondary);
}
.tweet-logo {
  color: var(--text-secondary);
}
.tweet-content {
  margin-top: 1rem;
}
.tweet-content a {
  color: var(--text-secondary);
}

[data-style="supabase"] {
  width: 400px;
}
[data-style="supabase"] .tweet-author {
  position: relative;
}
[data-style="supabase"] .tweet-logo {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -4px;
  left: -8px;
  background: var(--text-secondary);
  color: var(--bg-primary);
  border-radius: 9999px;
  padding: 0.2rem;
}

@media only screen and (max-width: 500px) {
  .tweet {
    width: 100%;
    max-width: 500px;
  }
  [data-style="supabase"] {
    width: 100%;
    max-width: 400px;
  }
}
</style>
