import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      "~~": path.resolve(__dirname, ".."),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./vue/index.ts"),
      name: "index",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: "Vue",
        },
        exports: "named",
        dir: "dist",
      },
    },
  },
})
