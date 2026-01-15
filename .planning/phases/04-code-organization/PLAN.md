# Phase 4: Code Organization - Detailed Plan

**Phase**: 4 of 5
**Approach**: File restructuring and type definitions
**Estimated Impact**: Improved organization, minimal code changes

---

## Phase Overview

**Goal**: Restructure file layout for clarity, discoverability, and maintainability

**Problem**:
- No clear organization principles
- Related files scattered across directories
- Difficult to locate functionality
- No centralized type definitions
- Utilities not grouped by feature domain

**Deliverables**:
- `src/types/recipe.ts` - Recipe type definitions
- `src/types/shopping-list.ts` - Shopping list type definitions
- Organized directory structure with logical grouping
- README files for major directories
- Updated imports where needed
- Verified build and all pages work

**Approach**:
Focus on type extraction and directory organization. Utilities are already well-organized from Phases 1-3, so primary work will be:
1. Extract types from utility modules into centralized type definitions
2. Add directory documentation (README files)
3. Minimal file moves (no large refactorings)
4. Verification of all functionality

---

## Plan 01: Create Type Definitions

**Goal**: Extract types from utility modules into centralized type definitions

**Files to Analyze**:
- `src/utils/recipe-metadata.ts` - Contains RecipeMetadata, StepItem, FrontmatterResult interfaces
- `src/utils/recipe-shopping-list.ts` - Contains RecipeIngredient interface
- `src/utils/quantity-formatter.ts` - Contains Fraction interface

**Target Files**:
- `src/types/recipe.ts` - Recipe-related types
- `src/types/shopping-list.ts` - Shopping list types

**Implementation**:
1. Extract RecipeMetadata, StepItem, FrontmatterResult from recipe-metadata.ts
2. Extract RecipeIngredient from recipe-shopping-list.ts
3. Extract Fraction from quantity-formatter.ts
4. Create type files with proper exports
5. Update utility modules to import types

**Expected Impact**:
- Centralized type definitions
- Better TypeScript type safety
- Easier to understand data structures

**Success Criteria**:
- [ ] Type files created in src/types/
- [ ] All interfaces exported correctly
- [ ] Utility modules updated to import from types/
- [ ] No TypeScript errors
- [ ] All features work identically

---

## Plan 02: Organize Utilities by Feature

**Goal**: Restructure src/utils/ directory for clarity and discoverability

**Current State**:
```
src/utils/
├── parse-recipe.ts              # Recipe parsing (Phase 1)
├── food-classifier.ts          # Food classification (Phase 2)
├── unit-converter.ts           # Unit conversion (Phase 2)
├── shopping-list-aggregator.ts  # Shopping list aggregation (Phase 2)
├── shopping-list-renderer.ts   # Shopping list rendering (Phase 2)
├── quantity-formatter.ts       # Quantity formatting (Phase 3)
├── recipe-scaler.ts            # Recipe scaling (Phase 3)
├── recipe-shopping-list.ts      # Recipe shopping list (Phase 3)
└── recipe-metadata.ts            # Recipe metadata (Phase 3)
```

**Proposed Organization**:
```
src/utils/
├── recipe/                     # Recipe-related utilities
│   ├── metadata.ts             # Metadata parsing & JSON-LD
│   ├── scaling.ts              # Recipe scaling
│   ├── shopping-list.ts        # Shopping list integration
│   └── quantity-formatter.ts  # Fraction formatting
└── shopping-list/               # Shopping list utilities
    ├── aggregator.ts           # Ingredient aggregation
    └── renderer.ts             # DOM rendering
```

**Implementation**:
1. Create src/utils/recipe/ directory
2. Move recipe metadata, scaling, shopping-list, quantity-formatter utilities
3. Create src/utils/shopping-list/ directory (already exists)
4. Move aggregator and renderer utilities
5. Keep parse-recipe.ts in utils root (shared utility)
6. Update all imports in pages and components

**Expected Impact**:
- Clear separation of concerns by domain
- Easier to locate recipe vs shopping list utilities
- Better organization for new features

**Success Criteria**:
- [ ] Utilities organized by feature domain
- [ ] All imports updated correctly
- [ ] No broken imports
- [ ] All features work identically

---

## Plan 03: Add Directory Documentation

**Goal**: Add README files to major directories for clarity

**Target Directories**:
- `src/utils/` - Overview of utility modules
- `src/utils/recipe/` - Recipe utilities
- `src/utils/shopping-list/` - Shopping list utilities
- `src/types/` - Type definitions
- `src/components/` - Component overview

**Implementation**:
1. Create src/utils/README.md with module index
2. Create src/utils/recipe/README.md with recipe utilities overview
3. Create src/utils/shopping-list/README.md with shopping list utilities overview
4. Create src/types/README.md with type definitions overview
5. Create src/components/README.md with component index

**Content Style**:
- Purpose of directory
- List of modules/components
- Brief description of each
- Usage examples for key modules

**Expected Impact**:
- Easier onboarding for new developers
- Clear documentation of codebase structure
- Reduced discovery time

**Success Criteria**:
- [ ] README files created for 5 directories
- [ ] Each README has clear purpose and structure
- [ ] Key modules documented with examples

---

## Plan 04: Verify and Update Imports

**Goal**: Verify all functionality works after reorganization and update imports

**Verification Steps**:
1. Check for TypeScript errors in modified files
2. Verify all pages import correctly
3. Check all components import correctly
4. Manual testing (no build verification available in this repo)

**Critical Files to Check**:
- `src/pages/index.astro` - Uses parse-recipe
- `src/pages/tags/index.astro` - Uses parse-recipe
- `src/pages/shopping-list.astro` - Uses Phase 2 utilities
- `src/pages/recipes/[slug].astro` - Uses Phase 3 utilities

**Expected Impact**:
- All imports resolve correctly
- No TypeScript errors
- All features work identically

**Success Criteria**:
- [ ] No TypeScript errors in src/
- [ ] All pages load without errors
- [ ] Shopping list works
- [ ] Recipe pages work
- [ ] Index pages work

---

## Plan 05: Final Cleanup and Documentation

**Goal**: Complete Phase 4 with comprehensive documentation

**Tasks**:
1. Final verification of all changes
2. Update STATE.md with Phase 4 completion
3. Update ROADMAP.md with Phase 4 progress
4. Create Phase 4 SUMMARY.md
5. Commit all changes

**Expected Impact**:
- Complete documentation for Phase 4
- Clean git history
- Clear progress tracking

**Success Criteria**:
- [ ] All 5 plans completed
- [ ] Documentation updated (STATE, ROADMAP, SUMMARY)
- [ ] All commits complete
- [ ] Phase 4 marked as complete

---

## Progress Tracking

| Plan | Status | Commits | Notes |
|------|--------|---------|-------|
| 01: Create Type Definitions | Not Started | 0 | - |
| 02: Organize Utilities | Not Started | 0 | Depends on Plan 01 |
| 03: Add Documentation | Not Started | 0 | Depends on Plans 01-02 |
| 04: Verify and Update | Not Started | 0 | Depends on Plans 01-03 |
| 05: Final Cleanup | Not Started | 0 | Final verification |
| **Total** | **0/5 Plans** | **0** | **Estimated: 3-5 commits** |

---

## Expected Outcomes

### Code Organization
- Centralized type definitions in src/types/
- Clear separation: recipe utilities, shopping list utilities
- Shared utility (parse-recipe) remains in root

### Directory Structure (After Phase 4)
```
src/
├── components/
│   ├── recipe/          # Recipe-related components
│   ├── shopping/        # Shopping list components
│   └── shared/          # Shared UI components
├── pages/
│   ├── index.astro
│   ├── recipes/
│   │   └── [slug].astro
│   ├── shopping-list.astro
│   └── tags/
│       └── index.astro
├── types/
│   ├── recipe.ts        # Recipe types
│   └── shopping-list.ts  # Shopping list types
└── utils/
    ├── parse-recipe.ts            # Shared recipe parsing
    ├── recipe/                     # Recipe utilities
    │   ├── metadata.ts
    │   ├── scaling.ts
    │   ├── shopping-list.ts
    │   └── quantity-formatter.ts
    └── shopping-list/               # Shopping list utilities
        ├── aggregator.ts
        └── renderer.ts
```

### Line Count Changes
- New type files: ~100 lines
- New README files: ~150 lines
- Minimal code moves (reorganization only)
- No significant file size changes

---

## Dependencies

**Phase 1 (Foundation)** ✅ Complete
- Will use parse-recipe utility

**Phase 2 (Shopping List)** ✅ Complete
- Shopping list utilities organized

**Phase 3 (Recipe Detail)** ✅ Complete
- Recipe utilities organized

---

## Success Criteria (Phase Complete When)

- [x] Phase plan created and approved
- [ ] Plan 01: Type definitions created and imported
- [ ] Plan 02: Utilities organized by feature
- [ ] Plan 03: Directory documentation added
- [ ] Plan 04: All imports verified and working
- [ ] Plan 05: Documentation complete, all commits done
- [ ] No TypeScript errors
- [ ] All pages and components work correctly
- [ ] Documentation updated (STATE.md, ROADMAP.md, SUMMARY.md)
- [ ] Clean git history with 3-5 commits

---

## Risks and Considerations

**Minimal Impact Design**:
- This phase focuses on organization, not code refactoring
- Minimal import changes reduce risk
- Type extraction should be low-risk (moving definitions)

**Import Updates**:
- Need to update imports in all pages and components
- Careful testing of each file
- Verify relative paths still work with new structure

**Testing Strategy**:
- Since build verification is not available in this repo:
  - Manual testing of key pages (index, shopping-list, recipe detail)
  - TypeScript error checking via lsp_diagnostics
  - Import verification by reading source files

---

## Notes

**Why Now**:
- After 3 phases of utility extraction, we have clean modules
- Codebase is well-structured but lacks:
  1. Centralized types
  2. Feature-based organization
  3. Directory documentation

**Alternative Approaches Considered**:
- Full restructure (rejected - too risky, minimal benefit)
- Component consolidation (rejected - components are already well-organized)
- Type extraction only (accepted - balanced approach)

**Focus**:
- Type extraction for better type safety
- Utility organization for discoverability
- Documentation for onboarding
- Minimal code changes to reduce risk
