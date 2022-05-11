<script setup lang="ts">
//@ts-ignore
import Logo from "~~/assets/logo.svg"
</script>

<template>
  <div class="p-8 w-full max-w-screen-xl">
    <div class="flex items-center justify-between mb-6">
      <NuxtLink to="/"><img :src="Logo" alt="static-tweet logo" class="h-16" /></NuxtLink>

      <div class="flex items-center space-x-2">
        <NuxtLink class="btn btn-pale" target="_blank" to="https://github.com/zernonia/static-tweet">GitHub</NuxtLink>
        <NuxtLink class="btn btn-primary" to="/create">Create</NuxtLink>
      </div>
    </div>

    <NuxtPage></NuxtPage>
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
</style>
