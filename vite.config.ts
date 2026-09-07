import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Set VITE_DISABLE_HMR=true in .env.local to turn off HMR during risky refactors
  // (full page refresh only; avoids partially-applied updates breaking the running app).
  const disableHmr = env.VITE_DISABLE_HMR === 'true'

  return {
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
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) return 'three-vendor'
              if (id.includes('gsap')) return 'gsap-vendor'
              if (id.includes('framer-motion') || id.includes('lenis')) return 'animation-vendor'
              if (id.includes('react-icons')) return 'icons-vendor'
              if (id.includes('recharts')) return 'charts-vendor'
              if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) return 'ui-vendor'
              if (id.includes('@tanstack/react-router')) return 'router-vendor'
              return 'vendor'
            }
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
    // Configure dev server
    server: {
      port: 3000,
      host: true,
      hmr: disableHmr ? false : { overlay: true },
      // Watch options for better file detection
      watch: {
        usePolling: true,
        // Ignore node_modules to improve performance
        ignored: ['**/node_modules/**', '**/.git/**'],
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
  }
})
