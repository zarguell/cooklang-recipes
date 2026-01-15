/**
 * ShoppingListAggregator - Aggregates ingredients across all recipes
 *
 * Provides utilities to:
 * - Normalize ingredient names using FoodClassifier
 * - Aggregate ingredients by name and dimension
 * - Convert units and combine quantities
 * - Group by category for organized display
 */

export function normalizeIngredientName(classifier: any, name: string) {
  return classifier.normalizeIngredient(name);
}

export function aggregateIngredients(recipes: any[]) {
  const aggregated = {};

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!ingredient.name) return;

      const normalizedName = normalizeIngredientName(null, ingredient.name);
      const { qty, unit } = parseQuantityAndUnit(ingredient);

      let key, dimension, canonicalQty;

      if (qty !== null && unit !== null) {
        const canonical = toCanonical(qty, unit);
        if (canonical) {
          dimension = canonical.dimension;
          canonicalQty = canonical.canonicalQty;
          key = `${normalizedName}__${dimension}`;
        } else {
          dimension = 'none';
          canonicalQty = null;
          key = `${normalizedName}__none`;
        }
      } else {
        dimension = 'none';
        canonicalQty = null;
        key = `${normalizedName}__none`;
      }

      if (!aggregated[key]) {
        aggregated[key] = {
          name: ingredient.name,
          normalizedName: normalizedName,
          dimension: dimension,
          canonicalQty: 0,
          originalUnit: unit || '',
          hasQuantity: qty !== null && unit !== null
        };
      }

      if (canonicalQty !== null) {
        aggregated[key].canonicalQty += canonicalQty;
        aggregated[key].hasQuantity = true;
      }
    });
  });

  return Object.values(aggregated).map(item => {
    if (item.hasQuantity && item.dimension !== 'none') {
      const display = convertToDisplayUnit(item.canonicalQty, item.dimension);
      return {
        name: item.name,
        unit: display.unit,
        baseQuantity: display.qty
      };
    } else {
      return {
        name: item.name,
        unit: item.originalUnit || '',
        baseQuantity: item.hasQuantity ? item.canonicalQty : null
      };
    }
  });
}
