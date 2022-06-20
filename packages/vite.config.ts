import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  resolve: {
    alias: {
      "~~": path.resolve(__dirname, ".."),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./index.ts"),
      name: "index",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        exports: "named",
        dir: "dist",
      },
    },
  },
})
