// @ts-check
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

const webDir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(webDir, '../..')
const routerShim = path.join(webDir, 'src/shims/tanstack-react-router.tsx')

export default defineConfig({
  integrations: [react()],
  publicDir: path.join(root, 'public'),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.join(root, 'src'),
        '@tanstack/react-router': routerShim,
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      // Hoisted monorepo: @astrojs/react/client.js is served via /@fs, so Vite never
      // discovers this import and would serve raw CJS (no `createRoot` export).
      include: ['react', 'react-dom', 'react-dom/client', 'gsap'],
    },
    server: {
      fs: {
        allow: [root],
      },
    },
  },
  server: {
    port: 4321,
  },
})
