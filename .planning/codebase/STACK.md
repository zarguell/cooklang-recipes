# Technology Stack

**Analysis Date:** 2025-01-15

## Languages

**Primary:**
- TypeScript 5.3+ - All application code in .ts and .astro files

**Secondary:**
- JavaScript/ES6+ - Build scripts, config files, client-side interactions

## Runtime

**Environment:**
- Node.js 22 - Specified in GitHub Actions workflow for deployment

**Package Manager:**
- npm - Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Astro 4.0.0 - Static site generator with island architecture
- Vite - Build tool integrated via Astro's Vite PWA integration

**Testing:**
- Not detected - No test framework configured

**Build/Dev:**
- TypeScript 5.3+ - Strict type checking via Astro configuration
- Vite - Fast build tooling
- @vite-pwa/astro - Progressive Web App support

## Key Dependencies

**Critical:**
- @tmlmt/cooklang-parser - Core recipe parsing library for CookLang format
- @astrojs/rss - RSS feed generation for recipe syndication
- @vite-pwa/astro - PWA functionality and service worker
- gray-matter - Frontmatter parsing for recipe metadata
- js-yaml - YAML parsing for recipe frontmatter

**Infrastructure:**
- Node.js built-ins - fs, path for file operations during build

## Configuration

**Environment:**
- Environment variables - `.env.example` with GitHub Pages-specific configuration
- Astro Config - `astro.config.mjs` with PWA integration and build settings

**Build:**
- `astro.config.mjs` - Astro framework configuration
- `tsconfig.json` - TypeScript strict mode configuration

## Platform Requirements

**Development:**
- Any platform with Node.js 22+
- No external dependencies or local services required

**Production:**
- GitHub Pages - Static site hosting
- Node.js 22 - Build environment via GitHub Actions
- CDN for static assets - No server-side processing

---

*Stack analysis: 2025-01-15*
*Update after major dependency changes*
