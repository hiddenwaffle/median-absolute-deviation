import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/median-absolute-deviation/',
  plugins: [
    basicSsl() // Needed for the file picker
  ]
})
