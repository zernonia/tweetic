import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    includeSource: ["server/**/*.{js,ts}"],
    deps: {
      inline: [/@nuxt\/test-utils-edge/],
    },
  },
})
