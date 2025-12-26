import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VYBZ',
        short_name: 'VYBZ',
        start_url: '/',
        display: 'standalone',
        background_color: '#0A0A0F',
        theme_color: '#0A0A0F',
        icons: [
          { src: '/logo.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/logo.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
            handler: 'CacheFirst',
            options: { cacheName: 'images', expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 } }
          },
          {
            urlPattern: /.*\.(?:js|css)/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'static-resources' }
          },
          {
            urlPattern: /.*\/(.*)video.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'videos', networkTimeoutSeconds: 10 }
          }
        ]
      }
    })
  ]
})