import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  publicDir: 'public',  // ✅ public 폴더 설정
  root: '.'  // ✅ 프로젝트 루트 폴더 설정
});

