# Coding Conventions

**Analysis Date:** 2025-01-16

## Naming Patterns

**Files:**
- TypeScript utilities: kebab-case.ts (parse-recipe.ts, food-classifier.ts, unit-converter.ts)
- Astro components: PascalCase.astro (RecipeCard.astro, IngredientList.astro)
- Astro layouts: PascalCase.astro (Layout.astro)
- Astro pages: lowercase.astro or [bracket].astro (index.astro, [slug].astro, [tag].astro)
- Type definitions: kebab-case.ts (recipe.ts, shopping-list.ts)
- Client scripts: kebab-case.js (quantity-formatter.js, recipe-scaler.js)

**Functions:**
- camelCase for all functions
- No special prefix for async functions
- Examples: parseRecipeFile, generateJsonLdSchema, classifyIngredient, aggregateIngredients

**Variables:**
- camelCase for variables
- No underscore prefix for private members (TypeScript private keyword used instead)
- Constants: camelCase for exported constants (conversions, unitAliases)

**Types:**
- Interfaces: PascalCase, no I prefix (RecipeMetadata, StepItem, Fraction)
- Type aliases: PascalCase (RecipeIngredient, FrontmatterResult)
- Enums: Not used in this codebase

## Code Style

**Formatting:**
- 2-space indentation (no tabs)
- Single quotes for string literals
- No trailing semicolons (JavaScript/TypeScript files)
- K&R brace style (opening brace on same line)
- No strict line length limit (but generally < 120 chars)
- Template literals for multi-line strings and interpolation

**Linting:**
- No ESLint/Prettier config files detected
- Conventions inferred from existing code patterns

## Import Organization

**Order:**
1. Node.js built-ins (fs, path)
2. Third-party packages (astro components, external libraries)
3. Internal modules (src/utils/, src/components/)
4. Type imports (import type {...})

**Grouping:**
- Blank line between import groups
- No explicit alphabetical sorting

**Path Aliases:**
- @/ not configured
- Relative imports used: ../utils/, ../../types/

## Error Handling

**Patterns:**
- Try-catch blocks with console.error logging
- Safe default return values on error (empty objects, arrays)
- Error context included in logs (file name, error details)

**Error Types:**
- Throw on invalid input or missing dependencies
- Log parsing errors but continue execution (fail gracefully)
- No custom error classes (built-in Error only)

**Logging:**
- console.error for failures
- Include file name or context in error message

## Logging

**Framework:**
- console.log, console.error (no structured logging)

**Patterns:**
- Log at service boundaries (parsing failures)
- Include context (file name, error object)
- No log levels (info, warn, debug) - just log and error

## Comments

**When to Comment:**
- Explain why, not what
- Document business logic and algorithms
- Add JSDoc for public API functions
- Include inline comments for complex logic

**JSDoc/TSDoc:**
- Required for public API functions
- Use @param, @returns, @example tags
- File-level documentation blocks in utility files

**TODO Comments:**
- Not used (no TODO/FIXME comments found in codebase)

## Function Design

**Size:**
- Keep under 50 lines when possible
- Extract helpers for complex logic

**Parameters:**
- Descriptive parameter names
- Destructure objects in parameter list
- No strict parameter limit

**Return Values:**
- Explicit return statements
- Return early for guard clauses
- Consistent return types

## Module Design

**Exports:**
- Named exports preferred for utilities (export function, export const)
- Default exports for Astro components
- Export types from src/types/ for reuse

**Barrel Files:**
- index.ts not used (direct imports preferred)
- Avoid circular dependencies

**Component Structure (Astro):**
- Frontmatter fence (---) for server-side code
- Template section for HTML
- Style tag for scoped CSS
- Script tag for client-side JavaScript

---

*Convention analysis: 2025-01-16*
*Update when patterns change*
