# Codebase Concerns

**Analysis Date:** 2025-01-16

## Tech Debt

**Duplicate fraction formatting logic (4 copies):**
- Issue: gcd(), toNiceFraction(), formatQty() duplicated in multiple files
- Files: src/components/RecipeSteps.astro, src/components/IngredientList.astro, src/utils/unit-converter.ts, public/scripts/quantity-formatter.js
- Why: Incremental development without consolidation
- Impact: Maintenance nightmare, inconsistencies likely
- Fix approach: Extract to shared utility module (src/utils/fraction-formatter.ts), import everywhere

**Widespread TypeScript any usage (23 instances):**
- Issue: Missing type definitions for Cooklang parser output
- Files: src/types/recipe.ts, src/utils/unit-converter.ts, src/utils/food-classifier.ts, src/utils/parse-recipe.ts, src/utils/recipe-metadata.ts, src/utils/shopping-list-aggregator.ts, src/utils/shopping-list-renderer.ts
- Why: Cooklang parser library lacks proper TypeScript types
- Impact: No compile-time safety, poor IDE support, runtime errors
- Fix approach: Define proper interfaces for Cooklang parser output

## Known Bugs

**XSS vulnerability in shopping list renderer:**
- Symptoms: Recipe titles and ingredient names could contain malicious scripts
- Trigger: User creates recipe with <script> tags in title/ingredients
- File: src/utils/shopping-list-renderer.ts (lines 34-44, 49-54, 81-89)
- Root cause: Direct use of innerHTML with user-controlled data
- Fix approach: Use textContent or sanitize with DOMPurify
- Severity: HIGH

**Unsafe localStorage usage without validation:**
- Symptoms: Application crashes on malformed JSON in localStorage
- Trigger: Corrupted localStorage data or manual tampering
- Files: src/layouts/Layout.astro (line 324), src/components/ThemeToggle.astro (line 21)
- Root cause: JSON.parse() without try/catch
- Workaround: None (crashes app)
- Fix approach: Wrap in try/catch and validate data structure
- Severity: MEDIUM

**Polling loop for async data loading:**
- Symptoms: Wastes CPU cycles, delays UI render
- Trigger: Shopping list page waits for classification data
- File: src/pages/shopping-list.astro (lines 91-104)
- Root cause: setTimeout polling loop instead of Promise-based async
- Workaround: None (performance degradation)
- Fix approach: Use Promise-based async/await or event emitter
- Severity: MEDIUM

## Security Considerations

**XSS in innerHTML usage:**
- Risk: User can inject malicious scripts via recipe titles/ingredients
- File: src/utils/shopping-list-renderer.ts
- Current mitigation: None
- Recommendations: Use textContent or DOMPurify sanitizer

**Unsafe JSON.parse:**
- Risk: Malformed localStorage data crashes application
- Files: src/layouts/Layout.astro, src/components/ThemeToggle.astro
- Current mitigation: None
- Recommendations: Wrap in try/catch with validation

**Global window namespace pollution:**
- Risk: Namespace collisions, harder to maintain
- Files: src/layouts/Layout.astro (window.shoppingList, window.BASE_URL), src/pages/shopping-list.astro
- Current mitigation: None
- Recommendations: Use namespace object or ES modules

## Performance Bottlenecks

**Polling loop for async data:**
- Problem: setTimeout polling instead of Promise/async-await
- File: src/pages/shopping-list.astro (lines 91-104)
- Measurement: Wastes CPU cycles checking every 50ms
- Cause: Waiting for classification data load
- Improvement path: Use Promise-based async/await or event emitter

**Unnecessary initial render delay:**
- Problem: 100ms setTimeout before UI initialization
- File: src/pages/shopping-list.astro (line 135)
- Measurement: 100ms delay to interactivity
- Cause: Historical workaround (no longer needed)
- Improvement path: Remove setTimeout, initialize immediately

## Fragile Areas

**Recipe parsing error handling:**
- Files: src/utils/parse-recipe.ts (lines 63-71), src/pages/recipes/[slug].astro (lines 35-47)
- Why fragile: Silent failures return empty objects, no error boundaries
- Common failures: Malformed Cooklang, invalid YAML, missing files
- Safe modification: Add error pages or boundaries, log to error tracking service
- Test coverage: No tests for parse failures

**Large monolithic components:**
- Files: src/pages/recipes/[slug].astro (559 lines), src/components/RecipeSteps.astro (433 lines), src/pages/shopping-list.astro (430 lines)
- Why fragile: Single file handles parsing, rendering, scripting, styling
- Common failures: Hard to test, understand, and modify
- Safe modification: Split into smaller components and utility modules
- Test coverage: No tests (makes refactoring risky)

## Scaling Limits

**Static site architecture:**
- Current capacity: Limited by GitHub Pages (1GB repository, 100GB bandwidth/month)
- Limit: Build time increases with recipe count
- Symptoms at limit: Slow builds, large dist/ size
- Scaling path: Pagination, incremental builds, move to more scalable hosting

## Dependencies at Risk

**Outdated packages:**
- Risk: @tmlmt/cooklang-parser 1.4.4 → 2.1.8 (major version bump)
- Impact: Breaking changes in recipe parsing
- Migration plan: Test compatibility, upgrade to v2.x

- Risk: astro 4.16.19 → 5.16.11 (major version bump)
- Impact: Breaking changes in Astro framework
- Migration plan: Test in staging, follow Astro v5 migration guide

## Missing Critical Features

**No test suite:**
- Problem: Zero test files, no guarantee complex logic works correctly
- Current workaround: Manual testing
- Blocks: Confidence in refactoring, catching regressions
- Implementation complexity: Medium (Vitest setup, write tests for utilities)

## Test Coverage Gaps

**Critical utilities untested:**
- What's not tested: Fraction conversion, unit conversion, ingredient aggregation, food classification
- Risk: Bugs in mathematical logic could corrupt recipe display
- Priority: HIGH
- Difficulty to test: Low (pure functions, easy to test)

**Recipe parsing untested:**
- what's not tested: File parsing, YAML frontmatter extraction, error handling
- Risk: Broken recipes appear on site with no indication
- Priority: MEDIUM
- Difficulty to test: Medium (requires test fixtures, file I/O mocking)

## Positive Findings

**What's done well:**
- No TODO/FIXME comments (production-ready code)
- Good error logging (all parse errors log to console)
- Consistent naming conventions
- Comprehensive JSDoc documentation on utilities
- Clean separation of concerns (utils, components, types)
- No hardcoded secrets (environment variables used)
- PWA properly configured
- RSS feed properly formatted
- Responsive design throughout
- Dark mode support with localStorage persistence

---

*Concerns audit: 2025-01-16*
*Update as issues are fixed or new ones discovered*
