# Coding Conventions

**Analysis Date:** 2025-01-15

## Naming Patterns

**Files:**
- .astro for all Astro components and pages (RecipeCard.astro, index.astro)
- [slug].astro for dynamic routes (recipes/[slug].astro, tags/[tag].astro)
- .cook for recipe content files
- .ts for TypeScript configuration and utility files
- .json for data files

**Functions:**
- camelCase for all JavaScript/TypeScript functions
- handleEventName for event handlers (handleClick, handleSubmit)
- No special prefix for async functions

**Variables:**
- camelCase for all variables (const recipes, const ingredients)
- UPPER_SNAKE_CASE for constants (if present)
- No underscore prefix for private members

**Types:**
- PascalCase for interfaces (Props interface in components)
- PascalCase for type aliases
- No I prefix for interfaces (not using IUser, IProps)

## Code Style

**Formatting:**
- No Prettier configuration detected
- 2-space indentation (consistent across all files)
- Single quotes for JavaScript/TypeScript strings
- Double quotes for HTML attributes
- Semicolons used in JavaScript/TypeScript
- No enforced line length limit

**Linting:**
- No ESLint configuration detected
- No automated linting tools configured
- Manual formatting consistency maintained

## Import Organization

**Order:**
1. Astro imports (import { getCollection } from 'astro:content')
2. External packages (import grayMatter from 'gray-matter')
3. Internal modules (import Component from '../components/Component.astro')
4. Type imports (import type { Props } from './types')

**Grouping:**
- Blank line between import groups
- No strict alphabetical ordering within groups

**Path Aliases:**
- @/ not used (relative imports only: ../components/, ../layouts/)

## Error Handling

**Patterns:**
- try/catch blocks in recipe parsing
- console.error for error logging during development
- No graceful error recovery for production

**Error Types:**
- Throw on recipe parsing failures
- Log errors with console.error
- No custom error classes defined
- No error boundary components

## Logging

**Framework:**
- console.log for normal output
- console.error for errors
- No structured logging framework (pino, winston)

**Patterns:**
- Console logging for debugging
- Error logging on build failures or parsing errors
- No structured logging with context objects
- No logging at service boundaries

## Comments

**When to Comment:**
- HTML comments for markup sections (<!-- Section -->)
- JavaScript comments for complex logic (// Comment)
- Limited inline documentation

**JSDoc/TSDoc:**
- Not used - No JSDoc comments on functions
- Props defined via TypeScript interfaces instead

**TODO Comments:**
- Not detected - No TODO/FIXME comments found

## Function Design

**Size:**
- No strict size limit enforced
- Large functions present (shopping-list.astro: 909 lines)
- Some functions should be extracted to smaller units

**Parameters:**
- Object parameters for multiple values (props objects)
- Destructuring in parameter lists common

**Return Values:**
- Explicit return statements
- No implicit undefined returns

## Module Design

**Exports:**
- Default exports for Astro components
- Named exports for utilities (rare)

**Barrel Files:**
- No barrel files (index.ts) for component exports
- Direct imports from component files

---

*Convention analysis: 2025-01-15*
*Update when patterns change*
