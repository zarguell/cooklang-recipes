# Phase 2: Shopping List Component Extraction - Plan 02

## Objective
Extract unit conversion and quantity formatting logic from ShoppingListUI into a standalone utility module.

## Current State
- File: `src/pages/shopping-list.astro` (808 lines)
- Script section: ~464 lines (lines 61-624)
- ShoppingListUI class contains ~200 lines of unit conversion logic:
  - Conversion constants (29 lines)
  - Unit aliases (34 lines)
  - parseQuantityAndUnit() (46 lines)
  - toCanonical() (31 lines)
  - convertToDisplayUnit() (35 lines)
  - formatQuantity() (40+ lines)

## Success Criteria
- [ ] Unit conversion logic extracted to `src/utils/unit-converter.ts`
- [ ] Quantity formatting logic extracted to utility
- [ ] Inline logic removed from `shopping-list.astro`
- [ ] shopping-list.astro imports and uses extracted utilities
- [ ] All behavior preserved (unit conversion, aggregation, display)
- [ ] Lines reduced in `shopping-list.astro` by ~200 lines
- [ ] File commits completed

## Execution Plan

### Task 1: Extract Unit Conversion and Formatting Utilities
**Action**: Create `src/utils/unit-converter.ts`
**Details**:
- Extract all unit conversion logic from ShoppingListUI:
  - `conversions` object - conversion factors to canonical units
  - `unitAliases` object - unit normalization map
  - `parseQuantityAndUnit(ingredient)` - parse qty/unit from ingredient
  - `toCanonical(qty, unit)` - convert to canonical units (ml/g)
  - `convertToDisplayUnit(canonicalQty, dimension)` - convert back to display
  - `formatQuantity(quantity)` - format as nice fractions
- Export as standalone functions and constants
- Add JSDoc documentation
- **Output**: New file ~200 lines

**Expected Changes**:
- New file: `src/utils/unit-converter.ts` (created)

**Commit**: `refactor(shopping): extract UnitConverter utility

Extracted unit conversion and quantity formatting logic into standalone utility module.
- Created src/utils/unit-converter.ts (~200 lines)
- Preserved all conversion and formatting functionality
- Improved separation of concerns`

---

### Task 2: Update shopping-list.astro to Use Extracted Utilities
**Action**: Update ShoppingListUI to import and use utilities
**Details**:
- Remove all unit conversion logic from ShoppingListUI:
  - Remove conversions constant (lines 69-98)
  - Remove unitAliases constant (lines 101-134)
  - Remove parseQuantityAndUnit method
  - Remove toCanonical method
  - Remove convertToDisplayUnit method
  - Remove formatQuantity method
- Add import: `import { parseQuantityAndUnit, toCanonical, convertToDisplayUnit, formatQuantity } from '../../utils/unit-converter.js';`
- Update all method calls to use imported functions
- Verify aggregation and rendering still work correctly

**Expected Changes**:
- File: `src/pages/shopping-list.astro` (808 → ~608 lines)
- Remove: ~200 lines of conversion logic
- Add: ~1 line import statement
- ShoppingListUI simplified to focus on UI logic only

**Commit**: `refactor(shopping): use extracted UnitConverter utilities

Updated shopping-list.astro to import unit conversion utilities.
- Removed inline conversion logic (~200 lines)
- Added imports for extracted utilities
- Reduced file to ~608 lines
- Behavior preserved`

---

## Success Metrics

### Lines of Code
- Before: `shopping-list.astro` = 808 lines
- After extraction: `shopping-list.astro` = ~608 lines, `unit-converter.ts` = ~200 lines
- Net reduction in main file: ~200 lines (25% reduction from current)

### Code Organization
- ✅ Single responsibility: UnitConverter handles conversions only
- ✅ Testability: Conversion logic isolated and testable
- ✅ Reusability: UnitConverter can be used by recipe pages
- ✅ Maintainability: Conversion rules in one place

### Behavior Preservation
- ✅ Unit normalization unchanged
- ✅ Canonical conversion (ml/g) preserved
- ✅ Display unit selection identical
- ✅ Fraction formatting maintained
- ✅ Ingredient aggregation works correctly

## Dependencies

### Files to Read
- `src/pages/shopping-list.astro` (current state, lines 69-360+)

### Files to Create
- `src/utils/unit-converter.ts`

### Files to Modify
- `src/pages/shopping-list.astro`

## Technical Notes

### Extraction Strategy
1. **Copy conversion constants**: Extract conversions and unitAliases objects
2. **Extract functions**: Copy all 6 conversion/formatting functions
3. **Create module exports**: Export functions and constants
4. **Update imports**: Add ES module imports in shopping-list.astro
5. **Verify behavior**: Test aggregation and rendering

### Edge Cases to Validate
- Fraction parsing (mixed numbers like "1 1/2", simple fractions like "7/12")
- Unknown units return null correctly
- Canonical unit thresholds for display (240ml → cups, 1000g → kg)
- Fraction formatting preserves precision
- Integration with FoodClassifier still works

## Phase Context

**Progress**: Phase 2, Plan 2 of 4
**Subsystem**: Shopping List Component
**Tags**: extraction, utility, unit-conversion, formatting
**Estimated Complexity**: Low-Medium (well-defined extraction, multiple interconnected functions)

**Next Steps** (after this plan):
- Plan 03: Extract UI components (ShoppingListItem, ShoppingListControls, ShoppingListTotals)
- Plan 04: Final orchestration and verification

**Cumulative Progress After Plan 02**:
- shopping-list.astro: 909 → 808 → ~608 lines (301 lines removed, 33% reduction)
- Utilities created: 2 (food-classifier.ts, unit-converter.ts)
