# Technology Stack

**Analysis Date:** 2025-01-16

## Languages

**Primary:**
- TypeScript 5.3 - All application code (src/utils/, src/components/, src/pages/)
- Astro (component format) - UI components and pages (.astro files)

**Secondary:**
- JavaScript (ES modules) - Client-side scripts in public/scripts/

## Runtime

**Environment:**
- Node.js 22 - Build time and development (.github/workflows/build-deploy.yml)
- Modern browsers - Client-side runtime (ES module support)

**Package Manager:**
- npm - Dependency management and scripts
- Lockfile: package-lock.json present

## Frameworks

**Core:**
- Astro 4.0 - Static site generator with file-based routing
  - Server-side rendering at build time
  - Zero JavaScript by default architecture

**Build/Dev:**
- Vite - Bundler (integrated with Astro)
- TypeScript 5.3 - Type checking and compilation (tsconfig.json extends astro/tsconfigs/strict)

**Progressive Web App:**
- @vite-pwa/astro 1.2 - PWA support
  - Service worker with Workbox
  - Offline capability
  - Auto-update strategy

## Key Dependencies

**Critical:**
- @tmlmt/cooklang-parser 1.1 - Parses Cooklang recipe format (.cook files)
  - Extracts ingredients, cookware, timers, and metadata
  - Used in src/utils/parse-recipe.ts, src/pages/recipes/[slug].astro
- js-yaml 4.1 - YAML frontmatter parser for recipe metadata
  - Used in src/utils/parse-recipe.ts, src/utils/recipe-metadata.ts
- @astrojs/rss 4.0 - RSS feed generation
  - Dynamic feed generation from recipe metadata (src/pages/rss.xml.ts)

**Infrastructure:**
- Node.js built-ins - fs, path for file operations
- Browser APIs - localStorage for shopping list persistence

## Configuration

**Environment:**
- .env.example - Template file for required variables
- PUBLIC_* prefix for all public variables (Astro convention)
  - PUBLIC_SITE - Site URL
  - PUBLIC_BASE - Base path for deployment
  - PUBLIC_APP_NAME, PUBLIC_APP_SHORT_NAME - App branding
  - PUBLIC_THEME_COLOR - PWA theme color (#ff6b35)
  - PUBLIC_BG_COLOR - PWA background color

**Build:**
- astro.config.mjs - Main Astro configuration
  - Static output mode (output: 'static')
  - Directory format build
  - PWA integration
  - Dynamic site/base from environment variables
- tsconfig.json - TypeScript compiler options (extends Astro's strict preset)

## Platform Requirements

**Development:**
- Any platform with Node.js 22
- No additional tooling required

**Production:**
- GitHub Pages - Static site hosting
  - Automated deployment via GitHub Actions
  - Configured in .github/workflows/build-deploy.yml

---

*Stack analysis: 2025-01-16*
*Update after major dependency changes*
