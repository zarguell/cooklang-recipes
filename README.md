# Cooklang Recipes

A static site builder for cooklang.

## Deployment Instructions

### Github Actions

Example `yaml`:

```yaml:
name: Build & Deploy Recipe Site

on:
  push:
    branches: [main]
    paths:
      - 'recipes/**'
      - '.github/workflows/build-deploy.yml'
  pull_request:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: Build Astro Site
    runs-on: ubuntu-latest
    steps:
      - name: Checkout recipes repo
        uses: actions/checkout@v4

      - name: Checkout template repo
        uses: actions/checkout@v4
        with:
          repository: zarguell/cooklang-recipes
          ref: main
          path: template

      - name: Copy recipes into template
        run: |
          rm -rf template/recipes
          mkdir -p template/recipes
          cp -R recipes/. template/recipes/

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
          cache-dependency-path: template/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: template

      - name: Build site
        run: npm run build
        working-directory: template
        env:
          CI: true

          # Defaults for GitHub Pages project sites:
          # https://<owner>.github.io/<repo>/ [web:91]
          GITHUB_OWNER: ${{ github.repository_owner }}
          GITHUB_REPO: ${{ github.event.repository.name }}

          # Optional user overrides (set these in repo Settings → Variables):
          # For username.github.io or custom domain, set:
          #   PUBLIC_SITE=https://username.github.io  (or https://example.com)
          #   PUBLIC_BASE=/  (or empty)
          PUBLIC_SITE: ${{ vars.PUBLIC_SITE }}
          PUBLIC_BASE: ${{ vars.PUBLIC_BASE }}

          # Optional branding overrides:
          PUBLIC_APP_NAME: ${{ vars.PUBLIC_APP_NAME }}
          PUBLIC_APP_SHORT_NAME: ${{ vars.PUBLIC_APP_SHORT_NAME }}
          PUBLIC_APP_DESCRIPTION: ${{ vars.PUBLIC_APP_DESCRIPTION }}
          PUBLIC_THEME_COLOR: ${{ vars.PUBLIC_THEME_COLOR }}
          PUBLIC_BG_COLOR: ${{ vars.PUBLIC_BG_COLOR }}

      - name: Upload build artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: template/dist

  deploy:
    name: Deploy to GitHub Pages
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```