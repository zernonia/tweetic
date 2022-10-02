// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~~/assets/main.css"],
  build: {
    transpile: ["twitter-api-v2"],
  },
  runtimeConfig: {
    isDev: process.env.NODE_ENV === "development",
    TWITTER_API_SECRET_KEY: process.env.API_SECRET_KEY,
    TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN
  },
  
  modules: ["nuxt-windicss", "@nuxtjs/supabase", 'nuxt-umami'],
  umami: {
    scriptUrl: 'https://umami-zernonia.vercel.app/umami.js',
    websiteId: '91452ea0-c879-4497-8bf0-0dd74ee96bb8',
    domains: 'tweetic.io,www.tweetic.io',
  }
})
