import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  publicDir: 'public'  // ✅ index.html이 있는 폴더 지정
});

