// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.cloudinary.com', // La URL de Cloudinary
        changeOrigin: true, // Cambiar el origen para que coincida con el objetivo
        rewrite: (path) => path.replace(/^\/api/, '') // Elimina '/api' de la URL
      }
    }
  }
});
