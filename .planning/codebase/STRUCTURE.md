# Codebase Structure

**Analysis Date:** 2025-01-16

## Directory Layout

```
cooklang-recipes/
├── src/                    # Application source code
│   ├── components/         # Reusable UI components (.astro)
│   ├── layouts/            # Page layout templates
│   ├── pages/              # File-based routing
│   │   ├── recipes/        # Dynamic recipe pages
│   │   └── tags/           # Tag-based filtering
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions and services
├── public/                 # Static assets (served as-is)
│   ├── scripts/            # Client-side JavaScript (ES modules)
│   ├── static/             # Static data files
│   ├── icons/              # PWA icons
│   └── recipes/            # Recipe file copies (via build)
├── recipes/                # Cooklang recipe source files
├── dist/                   # Build output (generated)
└── Configuration files     # Astro, TypeScript, CI/CD
```

## Directory Purposes

**src/components/** - Reusable UI Components
- Purpose: Astro components for recipe display and UI elements
- Contains: RecipeCard.astro, RecipeSteps.astro, IngredientList.astro, CookwareList.astro, ThemeToggle.astro, ViewControls.astro, JsonLdSchema.astro, CooklangSourceBlock.astro
- Key files:
  - RecipeCard.astro - Recipe card for listings
  - RecipeSteps.astro - Instruction steps with scaling
  - IngredientList.astro - Ingredient checklist
  - ThemeToggle.astro - Light/dark/system theme switcher
- Subdirectories: None (flat structure)

**src/layouts/** - Layout Templates
- Purpose: Base layout with global systems (theme, shopping list slot)
- Contains: Layout.astro
- Key files:
  - Layout.astro - Main layout with theme system, shopping list class, responsive design
- Subdirectories: None

**src/pages/** - File-Based Routing
- Purpose: Route handlers and page templates
- Contains: index.astro, [slug].astro, [tag].astro, rss.xml.ts, shopping-list.astro
- Key files:
  - index.astro - Homepage with recipe grid, search, view controls
  - recipes/[slug].astro - Dynamic recipe pages (generated via getStaticPaths())
  - tags/index.astro - Tag listing page
  - tags/[tag].astro - Individual tag pages
  - shopping-list.astro - Shopping list feature page
  - rss.xml.ts - RSS feed endpoint (XML generation)
- Subdirectories:
  - recipes/ - Dynamic recipe routes
  - tags/ - Tag-based filtering routes

**src/types/** - Type Definitions
- Purpose: Shared TypeScript interfaces and types
- Contains: recipe.ts, shopping-list.ts
- Key files:
  - recipe.ts - RecipeMetadata, StepItem, Fraction interfaces
  - shopping-list.ts - RecipeIngredient interface
- Subdirectories: None

**src/utils/** - Utilities and Services
- Purpose: Pure functions and classes for data transformation
- Contains: parse-recipe.ts, recipe-metadata.ts, food-classifier.ts, unit-converter.ts, shopping-list-aggregator.ts, shopping-list-renderer.ts
- Key files:
  - parse-recipe.ts - Recipe file parsing with YAML frontmatter
  - recipe-metadata.ts - Metadata extraction and JSON-LD generation
  - food-classifier.ts - Ingredient categorization class
  - unit-converter.ts - Unit conversion utilities
  - shopping-list-aggregator.ts - Ingredient aggregation logic
  - shopping-list-renderer.ts - Shopping list UI rendering
- Subdirectories: None

**public/** - Static Assets
- Purpose: Files copied to dist/ as-is during build
- Contains: scripts/, static/, icons/, recipes/, favicon.svg
- Key files:
  - scripts/quantity-formatter.js - Fraction/quantity formatting
  - scripts/recipe-scaler.js - Recipe scaling functionality
  - scripts/recipe-shopping-list.js - Shopping list client logic
  - static/food-classification.json - Grocery store categories
  - icons/ - PWA icons (192x192.png, 512x512.png)
- Subdirectories:
  - scripts/ - Client-side ES modules
  - static/ - Static data files

**recipes/** - Content Source
- Purpose: Cooklang recipe source files with YAML frontmatter
- Contains: *.cook files
- Copied to: public/recipes/ during build (via copy-recipes script)
- Subdirectories: None (flat structure)

## Key File Locations

**Entry Points:**
- astro.config.mjs - Astro configuration
- package.json - Build scripts (dev, build, preview)
- src/pages/index.astro - Homepage
- src/layouts/Layout.astro - Base layout

**Configuration:**
- astro.config.mjs - Build configuration (PWA, static output)
- tsconfig.json - TypeScript compiler options (extends Astro strict)
- .env.example - Environment variable template
- renovate.json - Automated dependency updates
- .deepsource.toml - Static analysis configuration

**Core Logic:**
- src/utils/parse-recipe.ts - Recipe parsing
- src/utils/recipe-metadata.ts - Metadata handling
- src/utils/food-classifier.ts - Ingredient categorization
- src/utils/unit-converter.ts - Unit conversion
- src/utils/shopping-list-aggregator.ts - Ingredient aggregation
- src/utils/shopping-list-renderer.ts - Shopping list UI

**Testing:**
- Not applicable (no tests present)

**Documentation:**
- README.md - User-facing documentation
- .planning/ - Project planning and codebase documentation

## Naming Conventions

**Files:**
- Components: PascalCase.astro (RecipeCard.astro, IngredientList.astro)
- Utilities: kebab-case.ts (parse-recipe.ts, food-classifier.ts)
- Types: kebab-case.ts (recipe.ts, shopping-list.ts)
- Pages: lowercase.astro or [bracket].astro (index.astro, [slug].astro, [tag].astro)
- Scripts: kebab-case.js (quantity-formatter.js, recipe-scaler.js)
- Layouts: PascalCase.astro (Layout.astro)

**Directories:**
- Lowercase plural: components/, pages/, types/, utils/, layouts/, scripts/
- Singular for utilities: utils/

**Special Patterns:**
- [slug].astro - Dynamic route parameter
- [tag].astro - Dynamic route parameter
- rss.xml.ts - XML endpoint (.ts extension for code, .xml output)

## Where to Add New Code

**New Feature (e.g., recipe rating):**
- Utilities: src/utils/ (rating-calculator.ts)
- Types: src/types/ (rating.ts)
- Components: src/components/ (RecipeRating.astro)
- Client scripts: public/scripts/ (rating-handler.js)

**New Recipe Page Section:**
- Component: src/components/ (NewSection.astro)
- Update page: src/pages/recipes/[slug].astro (import and use component)

**New Utility Function:**
- Implementation: src/utils/ (utility-name.ts)
- Tests: src/utils/ (utility-name.test.ts - if testing is added)
- Import from pages/components as needed

**New Route/Command:**
- Definition: src/pages/ (new-route.astro)
- Handler: Inline in page frontmatter
- Utilities: src/utils/ (if needed)

**Type Definitions:**
- New types: src/types/ (feature-name.ts)
- Import from utilities/components as needed

## Special Directories

**dist/** - Build Output
- Purpose: Generated static HTML/CSS/JS from Astro build
- Source: Auto-generated by npm run build
- Committed: No (in .gitignore)

**public/recipes/** - Recipe Copies
- Purpose: Recipe files served to client
- Source: Copied from recipes/ via copy-recipes script
- Committed: Yes (generated during build)

**.planning/** - Project Documentation
- Purpose: Development planning and codebase analysis
- Source: Manual documentation (this file)
- Committed: Yes

---

*Structure analysis: 2025-01-16*
*Update when directory structure changes*
