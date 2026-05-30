import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/trinitas/',
  server: {
    proxy : {
      '/api': 'http://localhost:4444'
    }
  }
})
