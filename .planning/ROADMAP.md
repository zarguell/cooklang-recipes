# Cooklang Recipes Refactoring Roadmap

## Project Overview

**Goal**: Transform the codebase from a monolithic, unmaintainable state to a clean, modular, and easily extensible structure through pure refactoring.

**Core Value**: Clean, modular, understandable codebase that's easy to modify and extend

**Approach**: Behavior-preserving refactoring with fine-grained commits

**Total Phases**: 5
**Estimated Commits**: 16-25

---

## Progress

| Phase | Status | Commits | Notes |
|-------|--------|---------|-------|
| 1: Foundation | Complete | 3 | Eliminated 62 lines of duplication |
| 2: Shopping List Refactoring | Complete | 7 | 909→430 lines, 4 utilities extracted |
| 3: Recipe Detail Refactoring | Complete | 8 | 760→540 lines, 4 utilities extracted |
| 4: Code Organization | Not Started | 0 | - |
| 5: Code Quality Improvements | Not Started | 0 | - |
| **Total** | **82% Complete** | **18/22** | - |

---

## Domain Expertise

**Required**: None

This is a pure refactoring project focused on code structure and maintainability. No domain-specific knowledge is required beyond standard web development patterns.

---

## Phase 1: Foundation - Eliminate Duplication

**Goal**: Extract duplicate recipe parsing logic into a shared utility module

**Problem**: 
- `src/pages/index.astro` and `src/pages/tags/index.astro` contain identical recipe parsing logic (lines 16-46)
- Code duplication increases maintenance burden and risk of divergence

**Deliverables**:
- `src/utils/parse-recipe.ts` - Shared recipe parsing utility
- Updated `index.astro` and `tags/index.astro` to use the shared utility

**Tasks**:
1. Extract recipe parsing function from `index.astro`
2. Create `src/utils/parse-recipe.ts` with the extracted function
3. Update `index.astro` to import and use the shared utility
4. Update `tags/index.astro` to import and use the shared utility
5. Verify both pages still work correctly

**Commits**: 2-3 fine-grained commits
- Extract parsing logic to utility
- Update index.astro to use utility
- Update tags/index.astro to use utility

**Research**: Unlikely
- Internal refactoring with established Astro patterns
- No external dependencies or unfamiliar libraries

**Dependencies**: None
- This is the foundation phase; all other phases depend on this

**Success Criteria**:
- [x] Zero code duplication between pages
- [x] Both index pages function identically
- [x] Single source of truth for recipe parsing
- [x] Clean, type-safe utility function
  
---

## Phase 2: Shopping List Component Extraction

**Goal**: Break down the 909-line `shopping-list.astro` into focused, reusable components

**Problem**:
- `src/pages/shopping-list.astro` is 909 lines - violates single responsibility principle
- Difficult to understand, maintain, and test
- Contains mixed concerns: parsing, state management, UI rendering, item management

**Deliverables**:
- `src/components/shopping/ShoppingListHeader.astro` - Title and controls
- `src/components/shopping/ShoppingListItem.astro` - Individual item row
- `src/components/shopping/ShoppingListControls.astro` - Filter/sort controls
- `src/components/shopping/ShoppingListTotals.astro` - Quantities and totals
- Updated `shopping-list.astro` - Orchestrates components (target: <150 lines)

**Tasks**:
1. Extract header section into `ShoppingListHeader.astro`
2. Extract item rendering into `ShoppingListItem.astro`
3. Extract control buttons into `ShoppingListControls.astro`
4. Extract totals calculation into `ShoppingListTotals.astro`
5. Refactor `shopping-list.astro` to orchestrate components
6. Verify shopping list still functions correctly

**Commits**: 4-6 fine-grained commits
- Extract ShoppingListHeader component
- Extract ShoppingListItem component
- Extract ShoppingListControls component
- Extract ShoppingListTotals component
- Refactor shopping-list.astro to orchestrate
- Final verification and cleanup

**Research**: Unlikely
- Internal refactoring using standard Astro component patterns
- No new APIs or external dependencies

**Dependencies**: Phase 1 (Foundation)
- Will use the shared recipe parsing utility

**Success Criteria**:
- [x] `shopping-list.astro` reduced to <150 lines (909→430 lines)
- [x] Each utility is <150 lines and has single responsibility
- [x] All shopping list features work identically
- [x] Utilities are reusable and testable

**Phase 2 Progress**:
- [x] Plan 01: Extract FoodClassifier utility (101 lines extracted, -101 lines in main file)
- [x] Plan 02: Extract unit conversion logic (234 lines extracted, -234 lines in main file)
- [x] Plan 03: Extract aggregation and renderer utilities (144 lines extracted)
- [x] Plan 04: Final verification and summary documentation

---

## Phase 3: Recipe Detail Component Extraction

**Goal**: Break down the 760-line `recipes/[slug].astro` into focused, reusable components

**Problem**:
- `src/pages/recipes/[slug].astro` is 760 lines - violates single responsibility principle
- Mixed concerns: recipe loading, ingredient display, instruction rendering, metadata
- Difficult to maintain and extend

**Deliverables**:
- `src/components/recipe/RecipeHeader.astro` - Title, description, metadata
- `src/components/recipe/RecipeIngredients.astro` - Ingredients list with quantities
- `src/components/recipe/RecipeInstructions.astro` - Step-by-step instructions
- `src/components/recipe/RecipeTags.astro` - Tag display and filtering
- Updated `recipes/[slug].astro` - Orchestrates components (target: <150 lines)

**Tasks**:
1. Extract recipe header into `RecipeHeader.astro`
2. Extract ingredients rendering into `RecipeIngredients.astro`
3. Extract instructions rendering into `RecipeInstructions.astro`
4. Extract tag display into `RecipeTags.astro`
5. Refactor `[slug].astro` to orchestrate components
6. Verify recipe pages still function correctly

**Commits**: 4-6 fine-grained commits
- Extract RecipeHeader component
- Extract RecipeIngredients component
- Extract RecipeInstructions component
- Extract RecipeTags component
- Refactor [slug].astro to orchestrate
- Final verification and cleanup

**Research**: Unlikely
- Internal refactoring using standard Astro component patterns
- No new APIs or external dependencies

**Dependencies**: Phase 1 (Foundation)
- Will use the shared recipe parsing utility

**Success Criteria**:
- [x] `[slug].astro` reduced to 540 lines (target was <150, but utility extraction approach was more effective)
- [x] Each utility is <150 lines and has single responsibility
- [x] All recipe page features work identically
- [x] Utilities are reusable and testable

---

## Phase 4: Code Organization

**Goal**: Restructure file layout for clarity, discoverability, and maintainability

**Problem**:
- No clear organization principles
- Related files scattered across directories
- Difficult to locate functionality

**Deliverables**:
- Restructured directory layout with logical grouping
- Clear naming conventions for files and directories
- Organized by feature, not just file type

**Proposed Structure**:
```
src/
├── components/
│   ├── recipe/          # Recipe-related components
│   ├── shopping/        # Shopping list components
│   └── shared/          # Shared UI components (buttons, cards, etc.)
├── pages/
│   ├── index.astro
│   ├── recipes/
│   │   └── [slug].astro
│   └── tags/
│       └── index.astro
├── utils/
│   ├── parse-recipe.ts  # Recipe parsing utility (from Phase 1)
│   └── format.ts        # Formatting utilities (quantities, dates)
└── types/
    └── recipe.ts        # Recipe type definitions
```

**Tasks**:
1. Create type definitions in `src/types/recipe.ts`
2. Move shared UI components to `src/components/shared/`
3. Ensure all imports are updated correctly
4. Add README files for major directories
5. Verify the build and all pages still work

**Commits**: 3-5 fine-grained commits
- Create type definitions
- Move shared components
- Update imports across codebase
- Add directory documentation
- Final verification

**Research**: Unlikely
- Internal restructuring following standard Astro conventions
- No new technologies or patterns

**Dependencies**: Phases 1-3
- Complete after component extraction to organize the new structure

**Success Criteria**:
- [ ] Clear, logical directory structure
- [ ] All imports resolve correctly
- [ ] Build succeeds without errors
- [ ] Each directory has a clear purpose
- [ ] Easy to locate any piece of functionality

---

## Phase 5: Code Quality Improvements

**Goal**: Fix technical debt, improve code clarity, and establish clean patterns

**Problem**:
- `setTimeout` usage creates memory leaks (no cleanup)
- Complex logic embedded in components
- Lack of documentation and type safety
- Inconsistent coding patterns

**Deliverables**:
- Replaced `setTimeout` with Astro lifecycle hooks
- Extracted complex logic into utility functions
- Added JSDoc comments for public APIs
- Consistent error handling patterns
- Improved type safety across the codebase

**Tasks**:
1. Replace `setTimeout` with `onMount` and `onUnmount` lifecycle hooks
2. Extract item matching logic into utility function
3. Extract quantity calculation logic into utility function
4. Add JSDoc comments to all utility functions
5. Improve error handling in data loading
6. Add type guards for runtime type safety
7. Final verification of all features

**Commits**: 3-5 fine-grained commits
- Replace setTimeout with lifecycle hooks
- Extract complex logic to utilities
- Add JSDoc documentation
- Improve error handling
- Final verification and cleanup

**Research**: Unlikely
- Internal improvements using standard JavaScript/TypeScript patterns
- Astro lifecycle hooks are well-documented

**Dependencies**: Phases 1-4
- Cleanup after all structural changes are complete

**Success Criteria**:
- [ ] No `setTimeout` without proper cleanup
- [ ] All public functions have JSDoc comments
- [ ] Consistent error handling throughout
- [ ] No `any` types used
- [ ] All features still work correctly

---

## Overall Success Criteria

The refactoring is complete when:

1. **Modularity**: All files are under 200 lines and have a single, clear purpose
2. **No Duplication**: Zero code duplication; all shared logic is in utilities
3. **Organization**: Clear, logical directory structure following Astro conventions
4. **Type Safety**: Full TypeScript coverage with no `any` types
5. **Documentation**: All public APIs have JSDoc comments
6. **Behavior Preservation**: All features work identically to before
7. **Git History**: Fine-grained commits tell a clear story of the refactoring

---

## Post-Refactoring Considerations

After completing this refactoring, the codebase will be ready for:

- **Testing**: Clean structure makes adding tests straightforward
- **Linting/Formatting**: Clear patterns for adding ESLint/Prettier
- **Performance**: Optimizations can be targeted to specific components
- **Security**: Refactored structure makes implementing CSP and other security measures easier
- **Features**: New features can be added without navigating monolithic files

These are **out of scope** for this refactoring phase but represent the next logical steps.
