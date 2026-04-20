import { resolve } from 'path';

import { defineConfig } from 'vite';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nitro } from 'nitro/vite';

export default defineConfig({
  // ssr: {
  //   noExternal: true,
  // },
  publicDir: 'public',
  plugins: [tailwindcss(), tanstackStart({}), nitro(), viteReact()],
  resolve: {
    // This enables built-in support for path aliases defined in tsconfig.json
    tsconfigPaths: true,
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    allowedHosts: true,
  },
});
