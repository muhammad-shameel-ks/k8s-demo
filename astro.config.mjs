// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://shameel.barchy.online',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});