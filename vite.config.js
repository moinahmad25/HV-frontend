import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://hv-backend-zeta.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
