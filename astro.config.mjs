import { defineConfig } from 'astro/config';
import VitePWA from '@vite-pwa/astro';

// In astro.config.mjs, use process.env (Astro loads config before .env files). [web:92]
const OWNER = process.env.GITHUB_OWNER || '';
const REPO = process.env.GITHUB_REPO || '';

// SITE:
// - default in CI: https://<owner>.github.io (works for Pages) [web:91]
// - override: PUBLIC_SITE (custom domain or other URL)
const SITE =
  process.env.PUBLIC_SITE ||
  (OWNER ? `https://${OWNER}.github.io` : 'https://example.github.io');

// BASE:
// - default in CI: /<repo> for project pages [web:91]
// - override: PUBLIC_BASE="/" (root) or "" (root) for user/org pages or custom domains [web:91]
const BASE_RAW = (process.env.PUBLIC_BASE ?? (REPO ? `/${REPO}` : '/')).trim();

// Normalize so Astro gets either "" (root) or "/something" (no trailing slash).
const BASE =
  BASE_RAW === '' || BASE_RAW === '/'
    ? ''
    : `/${BASE_RAW.replace(/^\/+/, '').replace(/\/+$/, '')}`;

// For PWA manifest, start_url and scope should match the deployment subpath. [web:91]
const BASE_WITH_TRAILING = BASE ? `${BASE}/` : '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  outDir: './dist',
  build: { format: 'directory' },
  trailingSlash: 'always',
  integrations: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
      },
      manifest: {
        name: process.env.PUBLIC_APP_NAME ?? 'Recipe Site',
        short_name: process.env.PUBLIC_APP_SHORT_NAME ?? 'Recipes',
        description:
          process.env.PUBLIC_APP_DESCRIPTION ??
          'A beautiful static recipe site built with Astro and CookLang',
        theme_color: process.env.PUBLIC_THEME_COLOR ?? '#ff6b35',
        background_color: process.env.PUBLIC_BG_COLOR ?? '#ffffff',
        display: 'standalone',
        start_url: BASE_WITH_TRAILING,
        scope: BASE_WITH_TRAILING,
        icons: [
          { src: 'icons/192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
});
