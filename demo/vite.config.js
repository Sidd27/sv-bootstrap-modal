import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env.BASE_URL ?? '/',
  plugins: [svelte()],
  resolve: {
    alias: {
      'sv-bootstrap-modal': resolve(__dirname, '../src/main.js'),
    },
  },
});
