// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 🔽 BU BLOĞU EKLEYİN VEYA GÜNCELLEYİN
  build: {
    outDir: 'build', // Çıktı klasörünü 'build' olarak ayarlar
  },
  // 🔼
});