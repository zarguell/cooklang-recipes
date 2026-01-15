# External Integrations

**Analysis Date:** 2025-01-15

## APIs & External Services

**Payment Processing:**
- Not detected - No payment processing required

**Email/SMS:**
- Not detected - No email or SMS functionality

**External APIs:**
- CookLang Format - Recipe format specification and parser
  - Integration method: @tmlmt/cooklang-parser library
  - No auth required
  - File-based: Reads local .cook files during build

## Data Storage

**Databases:**
- Not detected - Purely static site, no database

**File Storage:**
- File system - Recipe content stored as .cook files
  - Location: `recipes/` directory
  - Client: Node.js fs module
  - No cloud storage required

**Caching:**
- Local storage - Client-side localStorage for shopping lists and theme preferences
  - No server-side caching

## Authentication & Identity

**Auth Provider:**
- Not detected - No authentication required (public recipe site)

**OAuth Integrations:**
- Not detected - No OAuth integrations

## Monitoring & Observability

**Error Tracking:**
- Not detected - Uses console.error for debugging (no production monitoring)

**Analytics:**
- Not detected - No analytics tracking

**Logs:**
- Console only - stdout/stderr logging during development and build
  - No centralized logging service

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Static site hosting
  - Deployment: Automatic on push to main branch via GitHub Actions
  - Environment vars: Configured in `.env.example` for GitHub Pages
  - Build output: `dist/` directory

**CI Pipeline:**
- GitHub Actions - Automated build and deployment
  - Workflows: `.github/workflows/build-deploy.yml`
  - Secrets: None (public repo, no credentials needed)

## Environment Configuration

**Development:**
- Required env vars: None (optional GitHub Pages configuration)
- Secrets location: `.env.local` (gitignored)
- Mock/stub services: None (all functionality is local)

**Staging:**
- Not detected - No staging environment

**Production:**
- Secrets management: Not applicable (public static site)
- Failover/redundancy: GitHub Pages provides CDN and redundancy

## Webhooks & Callbacks

**Incoming:**
- Not detected - No webhooks

**Outgoing:**
- Not detected - No outgoing webhooks

---

*Integration audit: 2025-01-15*
*Update when adding/removing external services*
