import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// Two pages only: the one-pager and the privacy policy (the brief allows nothing else).
// base './' keeps every path relative, so the build works on a subdomain or in a folder.
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html')
      }
    }
  }
})
