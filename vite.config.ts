/// <reference types="vitest" />
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from "vitest/config"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    exclude: [...configDefaults.exclude],
    sequence: {
      shuffle: false,
      concurrent: false,
    },
    fileParallelism: false,
    poolOptions: {
      threads: {
        isolate: true,
        singleThread: true,
        maxThreads: 1,
      },
    },
  },
  server: {
    watch: {
      ignored: ["**/data/data.json"],
    },
  },
})
