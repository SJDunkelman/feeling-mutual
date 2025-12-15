import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://www.feelingmutual.com',

  integrations: [
    react(),
    tailwind(),
  ],

  vite: {
    ssr: {
      noExternal: ['react-fast-marquee'],
    },
  },

  adapter: netlify(),
});