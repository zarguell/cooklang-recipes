# Codebase Structure

**Analysis Date:** 2025-01-15

## Directory Layout

```
cooklang-recipes/
├── src/                    # Source code
│   ├── layouts/            # Layout components
│   │   └── Layout.astro   # Main layout with theme system
│   ├── pages/              # Page components (file-based routing)
│   │   ├── index.astro    # Homepage
│   │   ├── recipes/       # Recipe detail pages
│   │   │   └── [slug].astro
│   │   ├── tags/          # Tag browsing pages
│   │   │   ├── index.astro
│   │   │   └── [tag].astro
│   │   ├── shopping-list.astro
│   │   └── rss.xml.ts     # RSS feed generator
│   ├── components/         # Reusable UI components
│   │   ├── RecipeCard.astro
│   │   ├── IngredientList.astro
│   │   ├── RecipeSteps.astro
│   │   ├── CookwareList.astro
│   │   ├── CooklangSourceBlock.astro
│   │   ├── ThemeToggle.astro
│   │   ├── ViewControls.astro
│   │   └── JsonLdSchema.astro
│   └── env.d.ts            # TypeScript declarations
├── recipes/                # Recipe content (CookLang files)
├── public/                 # Static assets
│   └── static/            # Static data files
│       └── food-classification.json
├── .github/               # GitHub Actions workflows
│   └── workflows/
│       └── build-deploy.yml
├── astro.config.mjs        # Astro configuration
├── package.json            # Project manifest
├── tsconfig.json           # TypeScript configuration
└── .env.example            # Environment variables template
```

## Directory Purposes

**src/layouts/**
- Purpose: Global layout components providing common structure
- Contains: Layout.astro (main layout with theme toggle and shopping list)
- Key files: Layout.astro - provides global structure, theme system
- Subdirectories: None

**src/pages/**
- Purpose: Page components defining routes and page logic
- Contains: index.astro, recipe detail pages, tag pages, shopping-list.astro, rss.xml.ts
- Key files:
  - index.astro - Homepage with recipe grid and search
  - recipes/[slug].astro - Dynamic recipe detail pages
  - tags/index.astro - Tag browsing
  - tags/[tag].astro - Tag-specific recipe pages
  - shopping-list.astro - Shopping list aggregation
  - rss.xml.ts - RSS feed generation
- Subdirectories: recipes/, tags/

**src/components/**
- Purpose: Reusable UI components for consistent design
- Contains: RecipeCard, IngredientList, RecipeSteps, ThemeToggle, ViewControls, etc.
- Key files:
  - RecipeCard.astro - Recipe display card
  - IngredientList.astro - Ingredient display with scaling
  - RecipeSteps.astro - Recipe instructions with step tracking
  - ThemeToggle.astro - Light/dark theme switcher
  - ViewControls.astro - View mode controls (grid/compact/list)
- Subdirectories: None

**recipes/**
- Purpose: Recipe content source files
- Contains: .cook files with CookLang syntax and YAML frontmatter
- Key files: example.cook (sample recipe format)
- Subdirectories: None (flat structure)

**public/static/**
- Purpose: Static data files and assets
- Contains: food-classification.json (ingredient categorization data)
- Key files: food-classification.json - shopping list categorization
- Subdirectories: None

**.github/workflows/**
- Purpose: CI/CD automation
- Contains: build-deploy.yml (GitHub Actions workflow)
- Key files: build-deploy.yml - automated build and deploy to GitHub Pages
- Subdirectories: None

## Key File Locations

**Entry Points:**
- `package.json` - npm scripts (dev, build, preview)
- `astro.config.mjs` - Astro framework configuration

**Configuration:**
- `astro.config.mjs` - Astro configuration with PWA integration
- `tsconfig.json` - TypeScript strict mode configuration
- `.env.example` - Environment variables template

**Core Logic:**
- `src/pages/` - Route handlers and page logic
- `src/components/` - Reusable UI components
- `src/layouts/Layout.astro` - Global layout and shopping list management
- `src/pages/rss.xml.ts` - RSS feed generation logic

**Testing:**
- Not detected - No test files present

**Documentation:**
- `README.md` - User-facing documentation (if present)

## Naming Conventions

**Files:**
- .astro - Astro component and page files
- [slug].astro - Dynamic route placeholders (bracket notation)
- .cook - CookLang recipe files
- .ts - TypeScript files (rss.xml.ts, env.d.ts)
- .json - JSON data files

**Directories:**
- kebab-case for all directories (src, layouts, pages, components, recipes, public)
- Plural for collections (pages, components, layouts, recipes)

**Special Patterns:**
- [slug].astro - Dynamic route parameter syntax (recipes/[slug].astro, tags/[tag].astro)
- index.astro - Default route for directories

## Where to Add New Code

**New Recipe:**
- Implementation: `recipes/{recipe-name}.cook`
- Tests: Not applicable (no testing framework)

**New Component:**
- Implementation: `src/components/{ComponentName}.astro`
- Tests: Not applicable

**New Page:**
- Implementation: `src/pages/{page-name}.astro` or `src/pages/{route}/[slug].astro`
- Tests: Not applicable

**New Utility:**
- Implementation: `src/utils/` (if extracting logic from pages)
- Tests: Not applicable

**New Static Asset:**
- Implementation: `public/` or `public/static/`
- Tests: Not applicable

## Special Directories

**dist/**
- Purpose: Build output directory (generated by Astro)
- Source: Auto-generated during build process
- Committed: No (in .gitignore)

**node_modules/**
- Purpose: npm dependencies
- Source: Installed by npm
- Committed: No (in .gitignore)

---

*Structure analysis: 2025-01-15*
*Update when directory structure changes*
