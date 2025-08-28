import path from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteReact(),
    tailwindcss(),
    // Bundle analyzer - generates stats.html in dist folder
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Enable automatic code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js and its dependencies
          'three-vendor': ['three'],
          // Separate GSAP
          'gsap-vendor': ['gsap'],
          // Separate animation libraries
          'animation-vendor': ['lenis'],
          // Separate UI libraries
          'ui-vendor': ['react-icons'],
          // Separate router
          'router-vendor': ['@tanstack/react-router'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
  },
  // Configure dev server to handle client-side routing
  server: {
    // @ts-ignore - historyApiFallback is passed to underlying server
    historyApiFallback: {
      index: '/index.html'
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      'gsap',
      'lenis',
      '@tanstack/react-router',
    ],
    exclude: [],
  },
})
