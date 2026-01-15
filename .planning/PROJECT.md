# Cooklang Recipes Refactoring

## What This Is

A static recipe site built with Astro that parses Cooklang recipe files. Currently has technical debt around code organization, duplication, and file size. This project refactors the existing codebase for maintainability while preserving all current functionality.

## Core Value

**Clean, modular, understandable codebase that's easy to modify and extend.**

If the code isn't clear and maintainable, nothing else matters.

## Requirements

### Validated

- ✓ Recipe parsing from CookLang files (.cook format) — existing
- ✓ Recipe listing with search and filtering — existing
- ✓ Recipe detail pages with ingredient scaling — existing
- ✓ Tag-based recipe browsing — existing
- ✓ Shopping list aggregation from multiple recipes — existing
- ✓ Theme system (light/dark/system) — existing
- ✓ RSS feed generation — existing
- ✓ PWA support — existing

### Active

- [ ] Modular component structure - Extract large files into focused components
- [ ] No code duplication - Shared utilities for common patterns
- [ ] Clean file organization - Logical structure, clear responsibilities
- [ ] Reduced file sizes - Break up 700-900 line files into manageable pieces

### Out of Scope

- Feature changes — Only restructuring, no new features
- Performance optimization — Speed improvements come later
- Security fixes — XSS, CSP, inline JS addressed in later phase
- Test infrastructure — Added after code is cleaned up
- Linting/formatting — Added after code is cleaned up

## Context

**Existing Codebase State:**
- Built with Astro 4.0.0, TypeScript, CookLang parser
- Static site generation, deployed to GitHub Pages
- Two problematic files identified:
  - `src/pages/shopping-list.astro` (909 lines) - Shopping list logic
  - `src/pages/recipes/[slug].astro` (760 lines) - Recipe detail page
- Duplicate recipe parsing logic in `src/pages/index.astro` and `src/pages/tags/index.astro`

**Technical Debt:**
- Large files with multiple responsibilities violate SRP
- Recipe parsing logic duplicated across pages
- No shared utility functions for common operations
- Complex inline scripts mixed with templates
- setTimeout calls without cleanup (memory leak risk)

**Refactoring Goals:**
- Extract component logic into focused, reusable modules
- Create shared utilities for recipe parsing and data manipulation
- Improve file organization and naming clarity
- Reduce cognitive load when reading/modifying code

## Constraints

- **Restructuring** — Can reorganize files, but production site must still work
- **Behavior preservation** — All existing features must function identically after refactoring
- **Commit granularity** — Fine-grained commits for each refactoring step
- **Dependencies** — OK to add new packages if they improve clarity (e.g., utility libraries)
- **Time** — Thoroughness over speed—do it right

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Priority: maintainability → quality → security | Can't test unmaintainable code; security needs clear context | — Pending |
| Pure refactoring phase | Focus on structure without behavioral changes | — Pending |
| Allow file restructuring | Better organization is worth breaking some import paths | — Pending |
| Fine-grained commits | Git history becomes roadmap for future Claude sessions | — Pending |

---
*Last updated: 2025-01-15 after initialization*
