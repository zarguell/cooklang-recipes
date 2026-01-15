# Phase 2: Shopping List Component Extraction - Plan 03

## Objective
Simplify remaining ShoppingListUI class by extracting remaining utility logic and restructuring for cleaner orchestration.

## Current State
- File: `src/pages/shopping-list.astro` (574 lines)
- ShoppingListUI class contains:
  - `normalizeName()` - wrapper for classifier
  - `aggregateIngredients()` - aggregates ingredients from all recipes (~80 lines)
  - `render()` - renders UI (DOM manipulation, ~140 lines)
  - `init()` - sets up event listeners (~50 lines)
- Inline HTML structure: empty state, shopping list container, header
- CSS styling (~310 lines)

## Success Criteria
- [ ] Extract remaining utility functions (normalizeName, aggregateIngredients)
- [ ] Simplify render() method by extracting DOM building logic
- [ ] Clean up init() method by extracting event handler setup
- [ ] Reduce total line count to <150 lines
- [ ] All behavior preserved
- [ ] File commits completed

## Execution Plan

### Task 1: Extract ShoppingList Utilities
**Action**: Create `src/utils/shopping-list-aggregator.ts`
**Details**:
- Extract `aggregateIngredients()` logic into standalone function
- Create `normalizeIngredientName()` utility
- Export functions that accept FoodClassifier instance
- Add JSDoc documentation
- **Output**: New file ~80-100 lines

**Expected Changes**:
- New file: `src/utils/shopping-list-aggregator.ts` (created)

**Commit**: `refactor(shopping): extract ShoppingList aggregator utilities

Extracted ingredient aggregation logic into standalone utilities.
- Created src/utils/shopping-list-aggregator.ts (~80-100 lines)
- Separated aggregation concerns from UI logic
- Improved testability**

---

### Task 2: Extract DOM Building Utilities
**Action**: Create `src/utils/shopping-list-renderer.ts`
**Details**:
- Extract DOM building logic from `render()` method:
  - `createEmptyState()` - builds empty state UI
  - `createRecipeListItem()` - builds recipe item element
  - `createIngredientItem()` - builds ingredient checkbox element
  - `createCategorySection()` - builds category section
- Export as standalone functions
- Add JSDoc documentation
- **Output**: New file ~120-150 lines

**Expected Changes**:
- New file: `src/utils/shopping-list-renderer.ts` (created)

**Commit**: `refactor(shopping): extract ShoppingList renderer utilities

Extracted DOM building logic into standalone utilities.
- Created src/utils/shopping-list-renderer.ts (~120-150 lines)
- Separated rendering concerns from UI logic
- Improved testability**

---

### Task 3: Simplify ShoppingListUI and Orchestrate
**Action**: Update `shopping-list.astro`
**Details**:
- Import extracted utilities
- Simplify `render()` to call renderer utilities
- Simplify `init()` to use extracted helpers
- Remove remaining redundant code
- Clean up HTML structure
- Focus file on orchestration only

**Expected Changes**:
- File: `src/pages/shopping-list.astro` (574 → ~130 lines)
- Keep: HTML structure, minimal orchestration logic, imports
- Remove: Aggregation logic, DOM building details, inline helpers

**Commit**: `refactor(shopping): simplify ShoppingListUI to orchestrator

Updated shopping-list.astro to use extracted renderer utilities.
- Simplified ShoppingListUI to orchestration only
- Reduced file to ~130 lines
- Behavior preserved

---

### Task 4: Final Cleanup and Verification
**Action**: Final verification and documentation
**Details**:
- Verify line count <150
- Check all functionality works
- Clean up any remaining issues
- Document Phase 2 completion

**Expected Changes**:
- Documentation updates (SUMMARY.md, STATE.md, ROADMAP.md)

**Commit**: `docs(02-03): complete ShoppingList extraction plan

Tasks completed: 4/4
- Extracted aggregator utilities
- Extracted renderer utilities
- Simplified ShoppingListUI to orchestrator
- Final cleanup and verification

File reduced from 909 to ~130 lines (86% reduction)`

---

## Success Metrics

### Lines of Code
- **Before**: shopping-list.astro = 574 lines
- **After extraction**: shopping-list.astro = ~130 lines
- **Net reduction**: ~444 lines (77% reduction from current state)
- **Total from original**: 909 → 130 lines (86% reduction)

### Code Organization
- ✅ Single responsibility: Each utility handles one concern
- ✅ Testability: All logic extracted and testable
- ✅ Maintainability: Clear separation of concerns
- ✅ File size: Shopping list page now lightweight orchestrator

### Behavior Preservation
- ✅ Ingredient aggregation unchanged
- ✅ UI rendering identical
- ✅ Event handling preserved
- ✅ All features work correctly

## Dependencies

### Files to Read
- `src/pages/shopping-list.astro` (current state)

### Files to Create
- `src/utils/shopping-list-aggregator.ts`
- `src/utils/shopping-list-renderer.ts`

### Files to Modify
- `src/pages/shopping-list.astro`

## Technical Notes

### Extraction Strategy
1. **Aggregator**: Extract business logic for ingredient processing
2. **Renderer**: Extract DOM building helpers
3. **Orchestrator**: Keep minimal UI coordination in page file
4. **Verification**: Ensure all features still work

### Edge Cases to Validate
- Empty shopping list displays correctly
- Recipe removal works
- Ingredient checkboxes toggle
- Clear all functionality preserved
- Category grouping displays correctly

## Phase Context

**Progress**: Phase 2, Plan 3 of 4
**Subsystem**: Shopping List Component
**Tags**: extraction, utility, renderer, orchestrator
**Estimated Complexity**: Medium (complex DOM manipulation logic)

**Next Steps** (after this plan):
- Plan 04: Final verification and documentation
- Move to Phase 3: Recipe Detail Refactoring

**Cumulative Progress After Plan 03**:
- shopping-list.astro: 909 → ~130 lines (779 lines removed, 86% reduction)
- Utilities created: 4 (food-classifier.ts, unit-converter.ts, shopping-list-aggregator.ts, shopping-list-renderer.ts)
