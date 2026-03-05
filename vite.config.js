import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://8000.d7f6e50aa771d225f90f57cca61ba303.selfmade.codes',
        changeOrigin: true,
        secure: false
      }
    }
  }
})