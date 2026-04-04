import { resolve } from 'path';

import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nitro } from 'nitro/vite';

export default defineConfig({
  ssr: {
    noExternal: true,
  },
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    allowedHosts: true,
  },
});
