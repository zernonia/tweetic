<template>
  <div class="p-8 min-h-screen min-w-screen bg-light-300 flex flex-col space-y-4">
    <Tweet url="https://twitter.com/zernonia/status/1512621505527484419"></Tweet>
    <Tweet url="https://twitter.com/supabase/status/1524055596395528194"></Tweet>
    <Tweet url="https://twitter.com/CloudflareDev/status/1524069279787847680"></Tweet>
    <Tweet url="https://twitter.com/supabase/status/1524055594587795456"></Tweet>
    <Tweet url="https://twitter.com/OSSInsight/status/1524071559865937920"></Tweet>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.tweet {
  width: 550px;
  padding: 2rem;
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: white;
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
  background: var(--primary);
  color: white;
  border-radius: 9999px;
  padding: 0.2rem;
}
</style>
