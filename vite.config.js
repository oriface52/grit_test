import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',  // ✅ 프로젝트 루트를 명확하게 설정
  publicDir: 'public',  // ✅ index.html이 있는 폴더 지정
  build: {
    outDir: 'dist'
  }
});
