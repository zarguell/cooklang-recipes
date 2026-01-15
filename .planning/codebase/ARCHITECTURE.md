# Architecture

**Analysis Date:** 2025-01-15

## Pattern Overview

**Overall:** Static Site Generator (SSG) with component-based architecture

**Key Characteristics:**
- File-based routing with dynamic routes
- Build-time content parsing and page generation
- Client-side interactions for dynamic features (shopping lists, theme)
- No server-side processing at runtime

## Layers

**Content Layer:**
- Purpose: Source of truth for recipe data
- Contains: CookLang recipe files (.cook format) with YAML frontmatter
- Location: `recipes/` directory
- Depends on: CookLang format specification
- Used by: Build system (Astro) to generate pages

**Presentation Layer:**
- Purpose: Route definitions and page rendering
- Contains: Astro page components for different routes
- Location: `src/pages/` directory
- Depends on: Content layer (recipe data) and Component layer
- Used by: Browser (serves pre-rendered HTML)

**Component Layer:**
- Purpose: Reusable UI elements and interactive features
- Contains: Recipe cards, ingredient lists, theme toggle, view controls
- Location: `src/components/` directory
- Depends on: Props from pages, Astro framework
- Used by: Presentation layer pages

**Layout Layer:**
- Purpose: Global structure and shared functionality
- Contains: Main layout with theme system, shopping list management
- Location: `src/layouts/Layout.astro`
- Depends on: Astro framework
- Used by: All pages (wraps content)

## Data Flow

**Build-Time Content Processing:**

1. Astro scans `recipes/` directory for .cook files
2. Each file is parsed using @tmlmt/cooklang-parser
3. YAML frontmatter is extracted and merged with parsed metadata
4. Static pages are generated for each recipe (`recipes/[slug].astro`)
5. Homepage and tag pages are built from aggregated recipe data

**Runtime Interactions:**

1. Browser loads pre-rendered HTML/CSS/JS from `dist/`
2. Client-side JavaScript handles user interactions (theme toggle, shopping list)
3. Shopping list state persisted to localStorage
4. No server-side processing occurs

**State Management:**
- Client-side localStorage for shopping lists and theme preferences
- No server-side state or persistence
- Each page is independent after load

## Key Abstractions

**Recipe Data Model:**
- Purpose: Structured representation of recipe content
- Examples: Parsed by @tmlmt/cooklang-parser in build step
- Pattern: Object-oriented with ingredients, steps, cookware, timers

**Shopping List System:**
- Purpose: Aggregate ingredients from multiple recipes with categorization
- Examples: `src/pages/shopping-list.astro` contains ShoppingList class
- Pattern: Client-side JavaScript class with localStorage persistence

**Theme System:**
- Purpose: Support light/dark/system theme modes
- Examples: `src/components/ThemeToggle.astro`
- Pattern: CSS variables with class-based theme switching

**View Modes:**
- Purpose: Display recipes in different layouts
- Examples: Grid, Compact, List views in `src/pages/`
- Pattern: CSS grid/flexbox with responsive classes

## Entry Points

**Development Entry:**
- Location: `npm run dev` script in package.json
- Triggers: User runs development server
- Responsibilities: Start Astro dev server with hot reloading

**Build Entry:**
- Location: `npm run build` script in package.json
- Triggers: User builds for production or CI/CD
- Responsibilities: Parse recipes, generate static pages, optimize assets

**Application Entry Points:**
- **Homepage**: `src/pages/index.astro` - Recipe grid with search
- **Recipe Detail**: `src/pages/recipes/[slug].astro` - Individual recipe page
- **Tag Browsing**: `src/pages/tags/index.astro`, `src/pages/tags/[tag].astro`
- **Shopping List**: `src/pages/shopping-list.astro` - Ingredient aggregation
- **RSS Feed**: `src/pages/rss.xml.ts` - Syndication endpoint

## Error Handling

**Strategy:** Console.error logging for debugging, no production error handling

**Patterns:**
- Try/catch blocks in recipe parsing (frontmatter, CookLang syntax)
- Console.error for development debugging
- No graceful error recovery (expected to work correctly or fail visibly)

## Cross-Cutting Concerns

**Logging:**
- Console.log for normal output, console.error for errors
- No structured logging framework
- Debugging logs in development only

**Validation:**
- Recipe validation via parser errors
- Frontmatter validation via YAML parsing
- Client-side input validation for shopping list operations

**Authentication:**
- Not applicable (public site, no authentication)

---

*Architecture analysis: 2025-01-15*
*Update when major patterns change*
