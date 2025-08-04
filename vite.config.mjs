// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // indispensable pour un bon routage en production
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: 'all'
  },
  preview: {
    host: '0.0.0.0',
    port: 5000
  },
  build: {
    outDir: 'dist', // dossier à déployer (défaut, mais on l’indique clairement)
  }
})

