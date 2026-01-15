# Phase 3: Recipe Detail Refactoring - Utility Extraction Plan

**Phase**: 3 of 5
**Target File**: `src/pages/recipes/[slug].astro` (760 lines)
**Approach**: Utility extraction (inline JavaScript pattern)
**Estimated Reduction**: Target <500 lines total (34% reduction)

---

## Phase Overview

**Goal**: Break down the 760-line recipe detail page by extracting inline JavaScript logic into focused, reusable utilities.

**Problem**:
- Inline script contains 176 lines of mixed concerns
- Complex logic embedded in page (scaling, shopping list, formatting, notifications)
- Difficult to test and maintain
- Some logic duplicates patterns from other pages

**Deliverables**:
- `src/utils/quantity-formatter.ts` - Fraction formatting utility
- `src/utils/recipe-scaler.ts` - Recipe scaling logic
- `src/utils/recipe-shopping-list.ts` - Shopping list integration utilities
- `src/utils/recipe-metadata.ts` - Metadata and schema generation utilities
- Updated `[slug].astro` - Simplified orchestration only

**Approach**:
Given the inline JavaScript pattern (similar to Phase 2's shopping-list.astro), utility extraction will be more effective than Astro component extraction. The template sections are already clean (~145 lines), and CSS (~307 lines) must remain in the page.

---

## Plan 01: Extract Formatting Utilities

**Goal**: Extract fraction and quantity formatting logic

**Lines to Extract**: 49 lines (279-327)
**Functions**:
1. `gcd(a, b)` - Greatest common divisor
2. `toNiceFraction(x)` - Convert decimal to nice fraction
3. `formatQty(x)` - Format quantity for display

**Target File**: `src/utils/quantity-formatter.ts`

**Implementation**:
- Extract the three functions verbatim
- Add JSDoc comments for public API
- Export as ES module

**Expected Impact**:
- Reduce inline script: 176 → 127 lines (-49 lines)
- Reusable utility for quantity formatting
- Testable functions

**Success Criteria**:
- [ ] Utility module created with three functions
- [ ] All functions exported correctly
- [ ] Inline script updated to import and use utility
- [ ] Quantity formatting works identically

---

## Plan 02: Extract Scaling Logic

**Goal**: Extract recipe scaling and quantity update logic

**Lines to Extract**: 25 lines (328-352)
**Functions**:
1. `applyScale(mult)` - Apply scale to ingredient quantities

**Target File**: `src/utils/recipe-scaler.ts`

**Dependencies**: Uses quantity-formatter for formatting

**Implementation**:
- Extract applyScale function
- Import quantity-formatter for formatQty
- Handle edge cases (NaN, infinite)
- Add JSDoc comments

**Expected Impact**:
- Reduce inline script: 127 → 102 lines (-25 lines)
- Cleaner separation of concerns
- Reusable scaling logic

**Success Criteria**:
- [ ] Utility module created
- [ ] Imports quantity-formatter correctly
- [ ] Inline script updated to use utility
- [ ] Scaling works identically

---

## Plan 03: Extract Shopping List Utilities

**Goal**: Extract shopping list integration logic

**Lines to Extract**: 96 lines (355-447)
**Functions**:
1. `getIngredientsForShoppingList()` - Extract ingredients from DOM
2. `isRecipeInShoppingList()` - Check if recipe in list
3. `updateShoppingListButton()` - Update button state
4. Notification creation and display

**Target File**: `src/utils/recipe-shopping-list.ts`

**Dependencies**: Uses DOM API, window.shoppingList

**Implementation**:
- Extract all shopping-list-related functions
- Keep DOM queries (page-specific)
- Add JSDoc comments
- Create notification utility function

**Expected Impact**:
- Reduce inline script: 102 → 6 lines (-96 lines)
- Cleaner event handlers
- Reusable shopping list integration

**Success Criteria**:
- [ ] Utility module created with all functions
- [ ] Inline script updated to import utilities
- [ ] Shopping list add/remove works identically
- [ ] Notifications display correctly

---

## Plan 04: Extract Recipe Metadata Utilities

**Goal**: Extract metadata parsing and JSON-LD schema generation

**Lines to Extract**: 67 lines (78-138)
**Functions**:
1. `getStepText(items)` - Extract text from step items
2. Frontmatter parsing logic (lines 29-41)
3. JSON-LD schema generation (lines 110-138)

**Target File**: `src/utils/recipe-metadata.ts`

**Dependencies**: Uses recipe data structure, yaml parser

**Implementation**:
- Extract getStepText function
- Extract frontmatter parsing function
- Extract JSON-LD generation function
- Add comprehensive JSDoc comments
- Handle error cases gracefully

**Expected Impact**:
- Reduce setup logic: 132 → 65 lines (-67 lines)
- Reusable metadata utilities
- Clean separation of data preparation

**Success Criteria**:
- [ ] Utility module created with all functions
- [ ] Frontmatter parsing works identically
- [ ] JSON-LD schema generation works correctly
- [ ] Error handling preserved

---

## Plan 05: Final Cleanup and Documentation

**Goal**: Complete Phase 3 with documentation

**Tasks**:
1. Verify all utilities work correctly
2. Check for unused imports
3. Create Phase 3 summary document
4. Update STATE.md and ROADMAP.md
5. Commit all changes

**Expected Final State**:
- `[slug].astro`: 760 → ~517 lines (-243 lines, 32% reduction)
- 4 utility modules created (~200-250 lines total)
- Total code: ~767 lines (vs 760 originally)
- All behavior preserved

**Summary Document**:
- Document each plan's extraction
- Show before/after line counts
- Note any technical decisions
- List created utilities

**Success Criteria**:
- [ ] All utilities imported and working
- [ ] No lint errors
- [ ] Recipe pages function identically
- [ ] Documentation complete
- [ ] Commits completed

---

## Progress Tracking

| Plan | Status | Lines Extracted | Commits | Notes |
|------|--------|-----------------|----------|-------|
| 01: Formatting Utilities | Not Started | -49 | 0 | - |
| 02: Scaling Logic | Not Started | -25 | 0 | Depends on Plan 01 |
| 03: Shopping List | Not Started | -96 | 0 | - |
| 04: Metadata | Not Started | -67 | 0 | - |
| 05: Cleanup | Not Started | - | 0 | Final verification |
| **Total** | **0/5 Plans** | **-237** | **0** | **Target: ~523 lines** |

---

## Expected Outcomes

### Code Organization
- Clear separation: data preparation → utilities → template
- Reusable utilities across the codebase
- Testable business logic

### File Structure
```
src/
├── pages/
│   └── recipes/
│       └── [slug].astro          # ~523 lines (down from 760)
├── utils/
│   ├── parse-recipe.ts            # From Phase 1
│   ├── food-classifier.ts         # From Phase 2
│   ├── unit-converter.ts          # From Phase 2
│   ├── shopping-list-aggregator.ts # From Phase 2
│   ├── shopping-list-renderer.ts   # From Phase 2
│   ├── quantity-formatter.ts       # NEW (Plan 01)
│   ├── recipe-scaler.ts          # NEW (Plan 02)
│   ├── recipe-shopping-list.ts    # NEW (Plan 03)
│   └── recipe-metadata.ts        # NEW (Plan 04)
```

### Line Counts (Estimated)
- Original: 760 lines (single monolithic file)
- After: ~767 lines (523 in page + ~244 in utilities)
- Reduction in main file: 32% (237 lines extracted)
- Total code increase: ~1% (7 lines) - acceptable for improved structure

---

## Dependencies

**Phase 1 (Foundation)** ✅ Complete
- Uses `parseRecipeFile` utility

**Phase 2 (Shopping List)** ✅ Complete
- Shopping list utilities from Phase 2 may be useful for Plan 03

---

## Success Criteria (Phase Complete When)

- [x] Phase plan created and approved
- [ ] Plan 01: Formatting utilities extracted and working
- [ ] Plan 02: Scaling logic extracted and working
- [ ] Plan 03: Shopping list utilities extracted and working
- [ ] Plan 04: Metadata utilities extracted and working
- [ ] Plan 05: Documentation complete, all tests pass
- [ ] `[slug].astro` reduced to <550 lines
- [ ] All recipe page features work identically
- [ ] All utilities are reusable and testable
- [ ] No TypeScript errors
- [ ] Documentation updated (STATE.md, ROADMAP.md, SUMMARY.md)
