import process from 'node:process';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.BACKEND_URL || 'http://127.0.0.1:3001',
          changeOrigin: true,
        },
      },
    },
    preview: {
      proxy: {
        '/api': {
          target: env.BACKEND_URL || 'http://127.0.0.1:3001',
          changeOrigin: true,
        },
      },
    },
  };
});
