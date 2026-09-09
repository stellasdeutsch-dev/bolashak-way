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
        // The two official lists are only fetched when somebody searches, so precaching them
        // would put 350 KB on every install for a screen most people open once. Cache the
        // chunk the first time it is actually asked for instead — after that it is offline too.
        globIgnores: ['**/lists.generated-*.js'],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/lists\.generated-[\w-]+\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'bolashak-lists',
              // Hashed filename: a new build produces a new URL, so one entry is enough.
              expiration: { maxEntries: 2 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        // Explicitly null — leaving the key out does NOT disable it, the plugin defaults it
        // to 'index.html'. The app is hash-routed, so index.html is only ever requested at
        // the app root (and is precached). With the fallback the worker answered deep paths
        // like /repo/stage/foo with index.html, the relative asset URLs then resolved
        // against /repo/stage/ and 404'd — a blank page — and it also captured the /cloud/
        // sub-app, whose own files sit under a longer path. Letting those paths reach the
        // host means 404.html runs and redirects into the right hash route.
        navigateFallback: null,
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
          // The two official lists are 300 KB of names nobody needs until they search,
          // so let the dynamic import in ListSearch give them their own chunk.
          if (id.includes('/src/content/lists.generated')) return undefined
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
  },
})
