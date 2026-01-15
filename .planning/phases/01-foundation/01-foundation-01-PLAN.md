---
phase: 01-foundation
plan: 01
type: execute
---

<objective>
Extract duplicate recipe parsing logic into a shared utility module to eliminate code duplication between index.astro and tags/index.astro.

Purpose: Establish single source of truth for recipe parsing, reducing maintenance burden and eliminating risk of divergence between duplicate implementations.

Output: Shared `src/utils/parse-recipe.ts` utility, both pages updated to use it, zero code duplication.
</objective>

<execution_context>
~/.config/opencode/get-shit-done/workflows/execute-phase.md
./summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@src/pages/index.astro
@src/pages/tags/index.astro

**Tech stack available:** Astro, TypeScript, @tmlmt/cooklang-parser, js-yaml
**Established patterns:** Utility functions in `src/utils/`, existing Recipe parser usage
**Constraining decisions:**
- Pure refactoring only (from PROJECT.md) - no behavioral changes
- Fine-grained commits required (one per logical change)
- Production site must still work after refactoring

**Issues being addressed:** Code duplication in CONCERNS.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create shared recipe parsing utility</name>
  <files>src/utils/parse-recipe.ts</files>
  <action>Create `src/utils/parse-recipe.ts` with the following:

1. Import dependencies: `readdir`, `resolve` from "fs/promises", `readFileSync` from "fs", `Recipe` from "@tmlmt/cooklang-parser", `yaml` from "js-yaml"

2. Export function `parseRecipeFile(filePath: string, fileName: string): { slug: string, parsed: any }` that:
   - Extracts slug from fileName (replace ".cook" with "")
   - Reads file content using `readFileSync(filePath, "utf-8")`
   - Parses YAML frontmatter with regex `/^---\n([\s\S]*?)\n---\n([\s\S]*)$/`
   - Loads YAML with `yaml.load()`, handles errors with console.error
   - Creates `Recipe` instance from content (after frontmatter)
   - Merges metadata: `{ ...parsed.metadata, ...frontmatter }` (frontmatter takes priority)
   - Catches Recipe parsing errors, returns safe default: `{ metadata: frontmatter, ingredients: [], sections: [] }`
   - Returns `{ slug, parsed }` object

3. Add JSDoc comment explaining function purpose and parameters

**What to avoid and WHY:**
- Don't change parsing logic - exact extraction from existing code
- Don't add new dependencies - use existing imports only
- Don't change error handling behavior - keep console.error pattern
- Don't modify Recipe structure - preserve existing format</action>
  <verify>File exists at `src/utils/parse-recipe.ts`, exports `parseRecipeFile` function, TypeScript compiles without errors</verify>
  <done>Utility function created with identical parsing logic to existing implementations</done>
</task>

<task type="auto">
  <name>Task 2: Update index.astro to use shared utility</name>
  <files>src/pages/index.astro</files>
  <action>Update `src/pages/index.astro`:

1. Add import at top: `import { parseRecipeFile } from "../utils/parse-recipe";`

2. Replace lines 16-46 (the entire recipes.map block) with:
   ```typescript
   const recipes = cookFiles.map((file) => {
     const filePath = resolve(recipesDir, file);
     return parseRecipeFile(filePath, file);
   });
   ```

3. Remove now-unused imports: `readFileSync` from "fs" (line 4), `yaml` from "js-yaml" (line 6), `Recipe` from "@tmlmt/cooklang-parser" (line 5)

4. Keep the recipes.sort block unchanged (lines 48-53)

**What to avoid and WHY:**
- Don't modify sorting logic - only replace parsing
- Don't change variable names - keep `recipes` for consistency
- Don't touch the rest of the file - only replace parsing section</action>
  <verify>File compiles without TypeScript errors, imports resolve correctly, only parsing section changed</verify>
  <done>index.astro uses shared utility, 30 fewer lines of code, identical parsing behavior</done>
</task>

<task type="auto">
  <name>Task 3: Update tags/index.astro to use shared utility</name>
  <files>src/pages/tags/index.astro</files>
  <action>Update `src/pages/tags/index.astro`:

1. Add import at top: `import { parseRecipeFile } from "../../utils/parse-recipe";`

2. Replace lines 16-47 (the entire recipes.map block) with:
   ```typescript
   const recipes = cookFiles.map((file) => {
     const filePath = resolve(recipesDir, file);
     return parseRecipeFile(filePath, file);
   });
   ```

3. Remove now-unused imports: `readFileSync` from "fs" (line 4), `yaml` from "js-yaml" (line 6), `Recipe` from "@tmlmt/cooklang-parser" (line 5)

4. Keep the recipes.sort and tag extraction blocks unchanged (lines 49-62)

**What to avoid and WHY:**
- Don't modify sorting or tag extraction - only replace parsing
- Don't change variable names - keep `recipes` for consistency
- Don't touch the rest of the file - only replace parsing section</action>
  <verify>File compiles without TypeScript errors, imports resolve correctly, only parsing section changed</verify>
  <done>tags/index.astro uses shared utility, 32 fewer lines of code, identical parsing behavior</done>
</task>

</tasks>

<verification>
Before declaring phase complete:
- [ ] `npm run build` succeeds without errors
- [ ] No TypeScript errors in any modified files
- [ ] Both index pages (home and tags) load correctly in dev server
- [ ] Recipe cards render identically to before (visual check)
- [ ] Zero code duplication remains between pages
</verification>

<success_criteria>

- All tasks completed
- All verification checks pass
- Shared utility `src/utils/parse-recipe.ts` created
- Both pages use the shared utility
- 60+ lines of duplicate code eliminated
- No behavioral changes detected
- Git commits: 3 fine-grained commits (one per task)
  </success_criteria>

<output>
After completion, create `.planning/phases/01-foundation/01-foundation-01-SUMMARY.md`:

# Phase 1 Plan 1: Foundation - Eliminate Duplication Summary

**Extracted duplicate recipe parsing logic into shared utility, eliminating 60+ lines of code duplication**

## Accomplishments

- Created `src/utils/parse-recipe.ts` with shared parsing function
- Updated `index.astro` to use shared utility (30 lines removed)
- Updated `tags/index.astro` to use shared utility (32 lines removed)
- Zero code duplication remains between pages
- Both pages function identically to before

## Files Created/Modified

- `src/utils/parse-recipe.ts` - New shared parsing utility (45 lines)
- `src/pages/index.astro` - Updated to use utility (30 lines removed, imports cleaned)
- `src/pages/tags/index.astro` - Updated to use utility (32 lines removed, imports cleaned)

## Decisions Made

- Exact extraction: Preserved all existing parsing logic without modification
- Function signature: `parseRecipeFile(filePath: string, fileName: string)` accepts both path and filename for flexibility
- Error handling: Kept existing console.error pattern and safe default return
- Import cleanup: Removed unused imports from both pages after refactoring

## Issues Encountered

None - straightforward extraction with clear duplication pattern

## Next Step

Phase 1 complete, ready for Phase 2: Shopping List Component Extraction
</output>
