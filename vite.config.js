import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// Pages: the home page (business loans), the Growth Guarantee Scheme page and the privacy policy.
// base './' keeps every path relative, so the build works on a subdomain or in a folder.
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ggs: resolve(__dirname, 'growth-guarantee-scheme.html'),
        privacy: resolve(__dirname, 'privacy.html')
      }
    }
  }
})
