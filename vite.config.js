import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // No es necesario configurar esbuild para manejar SVGs si usas SVGR
});
