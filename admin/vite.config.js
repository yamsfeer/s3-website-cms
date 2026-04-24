import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/admin/',
  server: {
    port: 8033,
    proxy: {
      '/api': {
        target: 'http://localhost:8031',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:8031',
        changeOrigin: true
      }
    }
  }
})
