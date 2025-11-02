import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AdminApplication/',
  build: {
    sourcemap: false,          // 👈 disables eval-based code that CSP blocks
  },
})
