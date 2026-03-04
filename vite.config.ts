import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'msomwa20.onrender.com',
      '.onrender.com',
    ],
  },
  preview: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'msomwa20.onrender.com',
      '.onrender.com',
    ],
  },
})
