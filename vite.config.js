import process from 'node:process';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const allowedHosts = (env.DEV_ALLOWED_HOSTS || '')
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean);
  return {
    plugins: [react()],
    server: {
      port: 2125,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.BACKEND_URL || 'http://127.0.0.1:3001',
          changeOrigin: true,
        },
      },
      allowedHosts,
    },
    preview: {
      port: 4173,
      strictPort: true,
      allowedHosts,
      proxy: {
        '/api': {
          target: env.BACKEND_URL || 'http://127.0.0.1:3001',
          changeOrigin: true,
        },
      },
    },
  };
});
