import { defineNuxtPlugin } from "#app"
import MasonryWall from "@yeger/vue-masonry-wall"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(MasonryWall)
})
