# Phase 2: Shopping List Component Extraction - Plan 01

## Objective
Break down the massive 909-line `shopping-list.astro` file by extracting the food classification logic into a standalone TypeScript utility module.

## Current State
- File: `src/pages/shopping-list.astro` (909 lines)
- Script section: ~565 lines (lines 56-623)
- Contains inline FoodClassifier class (~100 lines) handling ingredient classification
- No separation of concerns - all logic in page component

## Success Criteria
- [ ] Food classification logic extracted to `src/utils/food-classifier.ts`
- [ ] Inline class removed from `shopping-list.astro`
- [ ]shopping-list.astro imports and uses extracted utility
- [ ] All behavior preserved (ingredient classification, grouping, normalization)
- [ ] Lines reduced in `shopping-list.astro` by ~100 lines
- [ ] File commits completed

## Execution Plan

### Task 1: Extract Food Classification Utility
**Action**: Create `src/utils/food-classifier.ts`
**Details**:
- Extract FoodClassifier class (lines 62-163 from current file)
- Preserve all methods:
  - `loadData()` - async loads classification JSON
  - `normalizeIngredient(ingredientName)` - normalizes ingredient names
  - `classifyIngredient(ingredientName)` - classifies by category
  - `groupIngredientsByCategory(ingredients)` - groups ingredients
- Export class for use in components
- Add JSDoc documentation
- **Output**: New file ~100 lines

**Expected Changes**:
- New file: `src/utils/food-classifier.ts` (created)

**Commit**: `refactor(shopping): extract FoodClassifier utility

Extracted food classification logic into standalone utility module.
- Created src/utils/food-classifier.ts (~100 lines)
- Preserved all classification and grouping functionality
- Improved separation of concerns`

---

### Task 2: Update shopping-list.astro to Use Extracted Utility
**Action**: Update inline script to import and use FoodClassifier
**Details**:
- Remove inline FoodClassifier class definition (lines 62-163)
- Add import statement: `import { FoodClassifier } from '../../utils/food-classifier.js';`
- Verify ShoppingListUI still instantiates classifier correctly
- Test that classification behavior is preserved

**Expected Changes**:
- File: `src/pages/shopping-list.astro` (909 → ~809 lines)
- Remove: ~100 lines of class definition
- Add: ~1 line import statement
- ShoppingListUI constructor unchanged (still uses `new FoodClassifier()`)

**Commit**: `refactor(shopping): use extracted FoodClassifier utility

Updated shopping-list.astro to import FoodClassifier from utils.
- Removed inline class definition (~100 lines)
- Added import for extracted utility
- Reduced file to ~809 lines
- Behavior preserved`

---

## Success Metrics

### Lines of Code
- Before: `shopping-list.astro` = 909 lines
- After extraction: `shopping-list.astro` = ~809 lines, `food-classifier.ts` = ~100 lines
- Net reduction in main file: ~100 lines (11% reduction)

### Code Organization
- ✅ Single responsibility: FoodClassifier handles classification only
- ✅ Testability: Classification logic isolated and testable
- ✅ Reusability: FoodClassifier can be used by other components

### Behavior Preservation
- ✅ Ingredient normalization unchanged
- ✅ Classification rules identical
- ✅ Category grouping preserved
- ✅ Async data loading maintained

## Dependencies

### Files to Read
- `src/pages/shopping-list.astro` (current state)
- `src/static/food-classification.json` (to understand data structure)

### Files to Create
- `src/utils/food-classifier.ts`

### Files to Modify
- `src/pages/shopping-list.astro`

## Technical Notes

### Extraction Strategy
1. **Copy class definition**: Extract lines 62-163 verbatim
2. **Create module wrapper**: Add `export class FoodClassifier`
3. **Update imports**: Add ES module import in shopping-list.astro
4. **Verify instantiation**: ShoppingListUI constructor uses `new FoodClassifier()`

### Edge Cases to Validate
- Async loading in `loadData()` method must work correctly
- `window.BASE_URL` injection from Astro must still work
- Classification data loading errors handled properly
- Method signatures unchanged for ShoppingListUI integration

## Phase Context

**Progress**: Phase 2, Plan 1 of 4
**Subsystem**: Shopping List Component
**Tags**: extraction, utility, food-classification
**Estimated Complexity**: Low (straightforward extraction, well-defined boundary)

**Next Steps** (after this plan):
- Plan 02: Extract unit conversion logic
- Plan 03: Extract shopping list item component
- Plan 04: Extract shopping list manager component
