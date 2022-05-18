import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["nuxt-windicss"],
  css: ["~~/assets/main.css"],
  runtimeConfig: {
    TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
  },
})
