/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { buildCsp, siteOrigin } from './src/domain/csp'

// The CSP itself, and why each source is allowed, is in src/domain/csp.ts.

const cspMeta = (): Plugin => {
  let csp = buildCsp(siteOrigin(undefined))
  return {
    name: 'csp-meta',
    apply: 'build',
    configResolved(config) {
      csp = buildCsp(siteOrigin(config.env.VITE_SITE_URL as string | undefined))
    },
    transformIndexHtml: (html) => html.replace('<!--%CSP%-->', `<meta http-equiv="Content-Security-Policy" content="${csp}" />`),
  }
}

export default defineConfig({
  plugins: [
    react(),
    cspMeta(),
    // The app is fully local, so it works offline once cached; the manifest in public/ is reused.
    VitePWA({
      // 'prompt' lets main.tsx pick the moment to switch: never in the middle of the questions.
      registerType: 'prompt',
      injectRegister: 'auto',
      manifest: false,
      workbox: {
        // Fonts: Russian pages need latin + cyrillic, Kazakh ones also cyrillic-ext. latin-ext
        // (85 KB) only carries the diacritics of some university names, so it is cached the
        // first time a page actually uses it rather than on every install.
        globPatterns: ['**/*.{js,css,html,svg,webmanifest}', 'icon-*.png', 'apple-touch-icon.png', '**/inter-{latin,cyrillic,cyrillic-ext}-wght-normal-*.woff2'],
        // The two official lists are only fetched when somebody searches, so precaching them
        // would put 350 KB on every install for a screen most people open once. Cache the
        // chunk the first time it is actually asked for instead — after that it is offline too.
        globIgnores: ['**/lists*.generated-*.js'],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/inter-latin-ext-wght-normal-[\w-]+\.woff2$/,
            handler: 'CacheFirst',
            options: { cacheName: 'bolashak-fonts', expiration: { maxEntries: 2 }, cacheableResponse: { statuses: [0, 200] } },
          },
          {
            urlPattern: /\/assets\/lists[\w.]*\.generated-[\w-]+\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'bolashak-lists',
              // Hashed filename: a new build produces a new URL, so one entry is enough.
              expiration: { maxEntries: 6 },
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
        //
        // A deep path offline (/repo/master/roadmap) is answered with the precached 404.html
        // instead: it has no assets of its own, only the script that turns the path into the
        // hash route – exactly what the host does online. /cloud/ is another app and is left
        // to the network.
        navigateFallback: '404.html',
        navigateFallbackDenylist: [/\/cloud(\/|$)/],
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
          if (/\/src\/content\/lists[\w.]*\.generated/.test(id)) return undefined
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
    // the site/ folder is a separate project with its own Playwright tests
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
