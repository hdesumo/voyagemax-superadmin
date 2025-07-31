// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Chemin de base pour le déploiement
  plugins: [react()],
  preview: {
    port: 4173,
    allowedHosts: ['superadmin.voyagemax.net']
  }
})

