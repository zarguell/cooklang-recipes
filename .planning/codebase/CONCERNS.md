# Codebase Concerns

**Analysis Date:** 2025-01-15

## Tech Debt

**Large Files - Multiple Responsibilities:**
- Issue: `src/pages/shopping-list.astro` (909 lines) and `src/pages/recipes/[slug].astro` (760 lines) are excessively large
- Why: All functionality kept in single files during development
- Impact: Difficult to maintain, hard to understand, violates single responsibility principle
- Fix approach: Extract shopping list logic to separate component/module, split recipe detail page into smaller components

**Missing Test Framework:**
- Issue: No testing framework configured (no Jest, Vitest, Playwright)
- Why: Development focused on functionality, not test infrastructure
- Impact: No automated testing, all testing must be manual
- Fix approach: Add Vitest for unit tests, Playwright for E2E tests

**No Linting/Formatting Tools:**
- Issue: No ESLint or Prettier configuration
- Why: Manual formatting during development
- Impact: Code style consistency relies on manual discipline, no automated enforcement
- Fix approach: Add ESLint with TypeScript rules, add Prettier for formatting

## Known Bugs

**No known bugs reported** - No TODO/FIXME/HACK comments found indicating known issues

## Security Considerations

**innerHTML Usage - XSS Risk:**
- Risk: Multiple innerHTML assignments in `src/pages/shopping-list.astro` (lines 503, 507, 516, 519, 549)
- Current mitigation: None (direct innerHTML without sanitization)
- Recommendations: Use textContent or sanitize HTML content with DOMPurify
- Location: `src/pages/shopping-list.astro`

**Inline JavaScript in Attributes:**
- Risk: `onerror` attribute with inline JavaScript in `src/components/RecipeCard.astro` (line 31)
- Current mitigation: None (inline JS in HTML attributes)
- Recommendations: Use event listeners in script tags instead of inline attributes
- Location: `src/components/RecipeCard.astro`

**No Content Security Policy:**
- Risk: No CSP headers defined
- Current mitigation: Static site on GitHub Pages (limited risk)
- Recommendations: Add CSP headers via GitHub Pages configuration

## Performance Bottlenecks

**setTimeout Without Cleanup:**
- Problem: Multiple setTimeout calls without cleanup in `src/pages/shopping-list.astro` (lines 400, 442, 570, 578) and `src/pages/recipes/[slug].astro` (lines 400, 442, 444)
- Measurement: Potential memory leaks if components unmount before timeout fires
- Cause: No clearTimeout on component unmount
- Improvement path: Store timeout IDs and clear in cleanup functions
- Location: `src/pages/shopping-list.astro`, `src/pages/recipes/[slug].astro`

**Duplicate Code Pattern:**
- Problem: Nearly identical recipe parsing logic in `src/pages/index.astro` and `src/pages/tags/index.astro` (lines 16-46)
- Measurement: Code duplication across multiple files
- Cause: Recipe parsing logic repeated in each page instead of shared utility
- Improvement path: Extract recipe parsing to shared utility function in `src/utils/parse-recipe.ts`
- Location: `src/pages/index.astro`, `src/pages/tags/index.astro`

## Fragile Areas

**Shopping List Component:**
- Why fragile: Largest file (909 lines) with multiple responsibilities
- Common failures: Complex state management, nested logic, difficult to debug
- Safe modification: Extract to smaller components with single responsibilities
- Test coverage: No tests (high risk area)

**Recipe Detail Page:**
- Why fragile: Large file (760 lines) with inline scripts and complex logic
- Common failures: Hard to understand, difficult to modify without breaking
- Safe modification: Extract ingredient scaling, recipe steps, and shopping list logic to separate components
- Test coverage: No tests (high risk area)

## Scaling Limits

**Static Site Limitations:**
- Current capacity: Limited to static site features (no server-side processing)
- Limit: Cannot support dynamic features requiring server (user accounts, database)
- Symptoms at limit: Cannot add dynamic content without rebuilding
- Scaling path: Would require migrating to server-side framework or adding serverless functions

**GitHub Pages:**
- Current capacity: 1GB repository size limit, 100GB bandwidth/month
- Limit: Large media files could exceed repository size
- Symptoms at limit: Cannot push to repository
- Scaling path: Move media to CDN or external storage

## Dependencies at Risk

**No known dependency risks** - Dependencies appear maintained and up-to-date

## Missing Critical Features

**Test Infrastructure:**
- Problem: No testing framework or automated tests
- Current workaround: Manual testing during development
- Blocks: Confidence in changes, regression prevention
- Implementation complexity: Medium (add Vitest, write initial tests)

**Code Quality Tools:**
- Problem: No automated linting or formatting
- Current workaround: Manual code review
- Blocks: Code consistency, automated error detection
- Implementation complexity: Low (add ESLint and Prettier configs)

## Test Coverage Gaps

**No test coverage** - Entire codebase lacks tests:
- What's not tested: All functionality (recipe parsing, shopping list, theme toggle, view modes)
- Risk: Bugs go undetected, refactoring breaks code silently
- Priority: High
- Difficulty to test: Need to add test framework first

---

*Concerns audit: 2025-01-15*
*Update as issues are fixed or new ones discovered*
