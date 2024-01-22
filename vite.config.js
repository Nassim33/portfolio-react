/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: './',
  plugins: [
    react(),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  server: {
    port: 3000,
    cors: true,
    proxy: {
    },
  },
});
