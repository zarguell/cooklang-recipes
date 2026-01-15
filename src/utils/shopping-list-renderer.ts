/**
 * ShoppingListRenderer - Builds DOM elements for shopping list UI
 *
 * Provides utilities to:
 * - Create empty state display
 * - Build recipe list items
 * - Build ingredient list items with checkboxes
 * - Build category sections
 * - Update stats display
 */

export function updateEmptyState(isEmpty: boolean) {
  const emptyState = document.getElementById('empty-state');
  const content = document.getElementById('shopping-list-content');

  if (isEmpty) {
    emptyState.style.display = 'block';
    content.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    content.style.display = 'block';
  }
}

export function updateStats(recipes: any[]) {
  const listStats = document.getElementById('listStats');
  const totalIngredients = recipes.reduce((sum, recipe) =>
    sum + (recipe.ingredients ? recipe.ingredients.length : 0), 0);
  listStats.textContent = `${recipes.length} recipe${recipes.length !== 1 ? 's' : ''}, ${totalIngredients} ingredient${totalIngredients !== 1 ? 's' : ''}`;
}

export function buildRecipeList(recipes: any[]): void {
  const recipesList = document.getElementById('recipes-list');
  recipesList.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeItem = document.createElement('div');
    recipeItem.className = 'recipe-item';
    recipeItem.innerHTML = `
      <span class="recipe-title">${recipe.title}</span>
      <button type="button" class="remove-recipe" data-slug="${recipe.slug}" title="Remove recipe">×</button>
    `;
    recipesList.appendChild(recipeItem);
  });
}

export function buildIngredientList(aggregated: any[], classifier: any): void {
  const aggregatedIngredients = document.getElementById('aggregated-ingredients');
  aggregatedIngredients.innerHTML = '';

  if (aggregated.length === 0) {
    aggregatedIngredients.innerHTML = '<p class="no-ingredients">No ingredients to show</p>';
    return;
  }

  aggregated.sort((a, b) => a.name.localeCompare(b.name));

  const grouped = classifier.groupIngredientsByCategory(aggregated);
  let ingredientIndex = 0;

  Object.keys(grouped).forEach(category => {
    const categorySection = document.createElement('div');
    categorySection.className = 'category-section';

    const categoryHeader = document.createElement('h4');
    categoryHeader.className = 'category-header';
    categoryHeader.textContent = category;
    categorySection.appendChild(categoryHeader);

    const categoryList = document.createElement('div');
    categoryList.className = 'category-ingredients';

    grouped[category].forEach(ingredient => {
      const ingredientDiv = document.createElement('div');
      ingredientDiv.className = 'aggregated-item';

      const quantityText = ingredient.baseQuantity > 0
        ? `${formatQuantity(ingredient.baseQuantity)}${ingredient.unit ? ' ' + ingredient.unit : ''} `
        : '';

      ingredientDiv.innerHTML = `
        <div class="ingredient-main">
          <input type="checkbox" id="ingredient-${ingredientIndex}" class="ingredient-checkbox">
          <label for="ingredient-${ingredientIndex}" class="ingredient-label">
            <span class="ingredient-quantity">${quantityText}</span>
            <span class="ingredient-name">${ingredient.name}</span>
          </label>
        </div>
      `;
      categoryList.appendChild(ingredientDiv);
      ingredientIndex++;
    });

    categorySection.appendChild(categoryList);
    aggregatedIngredients.appendChild(categorySection);
  });
}
