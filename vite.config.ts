import fs from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import { VitePWA } from 'vite-plugin-pwa'
import { contentMetaPlugin } from './scripts/content-meta-plugin.ts'

const base = process.env.BASE_PATH ?? (process.env.GITHUB_ACTIONS ? '/granica/' : '/')

function spaFallbackPlugin(): Plugin {
  return {
    name: 'spa-fallback',
    apply: 'build',
    closeBundle() {
      fs.copyFileSync('dist/index.html', 'dist/404.html')
      fs.writeFileSync('dist/.nojekyll', '')
    },
  }
}

export default defineConfig({
  base,
  plugins: [
    contentMetaPlugin(),
    spaFallbackPlugin(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkGfm, remarkMath],
        rehypePlugins: [[rehypeKatex, { throwOnError: true, strict: 'error' }]],
      }),
    },
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'favicon.svg',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/maskable-512.png',
        'icons/apple-touch-icon.png',
      ],
      manifest: {
        name: 'Granica — wytrzymałość materiałów',
        short_name: 'Granica',
        description:
          'Zrozum, zanim się złamie. Interaktywny kurs wytrzymałości materiałów: laboratoria, animowane rozwiązania, trening i kolokwium próbne.',
        lang: 'pl',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#f5f5f1',
        theme_color: '#17202a',
        categories: ['education', 'productivity'],
        icons: [
          { src: `${base}icons/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: `${base}icons/maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          {
            name: 'Trening liczbowy',
            short_name: 'Trening',
            url: `${base}training`,
            icons: [{ src: `${base}icons/icon-192.png`, sizes: '192x192' }],
          },
          {
            name: 'Kolokwium próbne',
            short_name: 'Kolokwium',
            url: `${base}exam`,
            icons: [{ src: `${base}icons/icon-192.png`, sizes: '192x192' }],
          },
        ],
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2,ttf}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
