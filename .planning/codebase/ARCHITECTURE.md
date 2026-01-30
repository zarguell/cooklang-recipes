# Architecture

**Analysis Date:** 2025-01-16

## Pattern Overview

**Overall:** Static Site Generator (SSG) with Component-Based Architecture

**Key Characteristics:**
- File-based routing system with dynamic route generation
- Server-side rendering at build time, client-side interactivity at runtime
- Content-driven architecture around Cooklang recipe files
- Zero backend API - fully static after build
- Hybrid rendering: Build-time parsing + runtime client-side scripts

## Layers

**Content/Data Layer:**
- Purpose: Recipe source files and static data
- Contains: recipes/*.cook files, public/static/food-classification.json
- Depends on: Cooklang recipe format
- Used by: Build-time parsing utilities

**Parsing/Processing Layer:**
- Purpose: Transform raw content into structured data
- Contains: Recipe parsers, metadata extractors, classifiers, converters
- Location: src/utils/ (parse-recipe.ts, recipe-metadata.ts, food-classifier.ts, unit-converter.ts, shopping-list-aggregator.ts, shopping-list-renderer.ts)
- Depends on: Content layer, external parser (@tmlmt/cooklang-parser)
- Used by: Pages and components

**Type Definition Layer:**
- Purpose: Shared TypeScript interfaces and types
- Contains: RecipeMetadata, StepItem, Fraction, RecipeIngredient
- Location: src/types/recipe.ts, src/types/shopping-list.ts
- Depends on: None (pure definitions)
- Used by: Utilities, components, pages

**Component/Presentation Layer:**
- Purpose: Reusable UI components with scoped styles
- Contains: RecipeCard, RecipeSteps, IngredientList, ThemeToggle, etc.
- Location: src/components/*.astro
- Depends on: Processing layer, type definitions
- Used by: Pages and layouts

**Layout Layer:**
- Purpose: Base templates with global systems
- Contains: Layout.astro (theme system, shopping list slot)
- Location: src/layouts/*.astro
- Depends on: Component layer
- Used by: All pages

**Page/Routing Layer:**
- Purpose: Route handlers and page templates
- Contains: index.astro, [slug].astro, [tag].astro, rss.xml.ts, shopping-list.astro
- Location: src/pages/
- Depends on: Layout, component, and processing layers
- Used by: Astro routing system

**Client-Side Script Layer:**
- Purpose: Runtime interactivity (ES modules)
- Contains: recipe-scaler.js, recipe-shopping-list.js, quantity-formatter.js, unit-converter.js, shopping-list-aggregator.js, shopping-list-renderer.js
- Location: public/scripts/
- Depends on: Browser APIs (localStorage, DOM)
- Used by: Browser hydration on page load

## Data Flow

**Build-Time Flow:**

1. Recipe discovery from recipes/ directory (src/pages/index.astro)
2. Parse .cook files with Cooklang parser (src/utils/parse-recipe.ts)
3. Extract YAML frontmatter and merge with parsed metadata
4. Generate static pages for each recipe using getStaticPaths() (src/pages/recipes/[slug].astro)
5. Generate JSON-LD schemas for SEO (src/utils/recipe-metadata.ts)
6. Build RSS feed (src/pages/rss.xml.ts)
7. Output static HTML to dist/ directory

**Runtime Flow:**

1. User requests page (e.g., /recipes/pasta/)
2. Astro serves pre-rendered HTML from dist/
3. Client-side scripts hydrate interactive features:
   - Recipe scaling via public/scripts/recipe-scaler.js
   - Shopping list management via public/scripts/recipe-shopping-list.js
   - Theme switching via ThemeToggle.astro
   - Search/filter via inline scripts in pages

**Shopping List Flow:**

1. User clicks "Add to Shopping List" on recipe page
2. Client script stores recipe in localStorage (window.shoppingList)
3. On shopping list page, ingredients aggregated by category
4. FoodClassifier categorizes ingredients using food-classification.json (src/utils/food-classifier.ts)
5. UnitConverter normalizes quantities for combining (src/utils/unit-converter.ts)
6. ShoppingListRenderer renders grouped items (src/utils/shopping-list-renderer.ts)

**State Management:**

- localStorage for shopping list persistence (client-side only)
- Theme persistence via localStorage (light/dark/system)
- No server-side state or database
- Each page load is independent (stateless server)

## Key Abstractions

**Recipe:**
- Purpose: Parsed Cooklang recipe structure
- Examples: src/pages/recipes/[slug].astro, src/utils/parse-recipe.ts
- Pattern: Class from @tmlmt/cooklang-parser with metadata override
- Properties: metadata (title, servings, prep-time), ingredients, sections, cookware, timers

**FoodClassifier:**
- Purpose: Categorize ingredients into grocery store sections
- Examples: src/utils/food-classifier.ts
- Pattern: Class with load, classify, group methods
- Data: 15 categories from food-classification.json

**UnitConverter:**
- Purpose: Normalize and convert between measurement units
- Examples: src/utils/unit-converter.ts
- Pattern: Pure functions (toCanonical, formatQuantity)
- System: Canonical unit system (ml) for unified conversions

**Component:**
- Purpose: Reusable UI building blocks
- Examples: RecipeCard.astro, RecipeSteps.astro, IngredientList.astro
- Pattern: Astro component with frontmatter, template, scoped CSS
- Props: Data passed via props interface

**Service/Utility:**
- Purpose: Pure functions for data transformation
- Examples: parseRecipeFile, generateJsonLdSchema, aggregateIngredients
- Pattern: Stateless functions with input/output
- Location: src/utils/*.ts

## Entry Points

**Build Entry:**
- Location: astro.config.mjs - Astro configuration
- Location: package.json - Build scripts (dev, build, preview)
- Triggers: npm run dev, npm run build

**Application Entry Points:**
- src/pages/index.astro - Homepage (recipe listing with search)
- src/layouts/Layout.astro - Base layout with global theme system
- src/pages/recipes/[slug].astro - Recipe detail pages (dynamic routing)
- src/pages/rss.xml.ts - RSS feed endpoint (XML generation)

**Script Entry Points:**
- public/scripts/quantity-formatter.js - Quantity formatting utilities (gcd, toNiceFraction)
- public/scripts/recipe-scaler.js - Scaling functionality
- public/scripts/recipe-shopping-list.js - Shopping list management
- public/scripts/unit-converter.js - Unit conversion utilities

## Error Handling

**Strategy:** Try-catch with console.error logging and safe defaults

**Patterns:**
- Recipe parsing errors log to console and return empty recipe object (src/utils/parse-recipe.ts)
- YAML parsing errors log but don't stop execution
- Frontmatter extraction fails gracefully with empty object
- No global error handler (each file handles its own errors)

## Cross-Cutting Concerns

**Logging:**
- console.error for parsing failures with file name context
- No structured logging framework

**Validation:**
- Input validation at parse boundaries (file existence, YAML format)
- No runtime validation framework (Zod, etc.)

**Authentication:**
- Not applicable (public read-only site)

**Theming:**
- CSS variables for light/dark/system themes
- Theme persistence in localStorage
- Theme toggle slot in Layout.astro

---

*Architecture analysis: 2025-01-16*
*Update when major patterns change*
