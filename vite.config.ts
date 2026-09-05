/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // The app is fully local, so it works offline once cached; the manifest in public/ is reused.
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,webmanifest}'],
        // No navigateFallback on purpose: the app is hash-routed, so index.html is only
        // ever requested at the app root (and is precached). With a fallback the worker
        // answered deep paths like /repo/stage/foo with index.html, and the relative asset
        // URLs then resolved against /repo/stage/ and 404'd — a blank page. Letting those
        // paths reach the host means 404.html runs and redirects into the hash route.
      },
    }),
  ],
  base: './',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Content changes far more often than the framework; keep them in separate chunks.
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/src/content/')) return 'content'
          return undefined
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Vite loads .env.local in test mode too; tests must never talk to a real project.
    env: { VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '' },
  },
})
