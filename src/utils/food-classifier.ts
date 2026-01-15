/**
 * FoodClassifier - Classifies ingredients into grocery store categories
 *
 * Loads food classification data from JSON and provides methods to:
 * - Normalize ingredient names (remove quantities, units, descriptors)
 * - Classify ingredients by category (Produce, Dairy, Meat, etc.)
 * - Group ingredients by category for organized display
 */

export class FoodClassifier {
  classificationData: any = null;

  constructor() {
    this.classificationData = null;
    this.loadData();
  }

  /**
   * Load food classification data from JSON file.
   *
   * Fetches classification data from the server including sections, rules,
   * and overrides. Data is required for classification to work.
   *
   * @async
   * @throws Logs error to console if fetch fails
   *
   * @example
   * await classifier.loadData();
   * // classifier.classificationData now contains classification rules
   */
  async loadData() {
    try {
      const response = await fetch(`${window.BASE_URL}static/food-classification.json`);
      this.classificationData = await response.json();
    } catch (error) {
      console.error('Failed to load food classification data:', error);
    }
  }

  /**
   * Normalize ingredient name by removing quantities, units, and descriptors.
   *
   * Processes ingredient names to extract the core food item by:
   * - Converting to lowercase
   * - Removing leading quantities (e.g., "2 cups")
   * - Removing units (tsp, tbsp, cup, oz, etc.)
   * - Removing parenthetical content
   * - Removing descriptors (chopped, grated, fresh, etc.)
   * - Trimming whitespace
   *
   * @param ingredientName - Raw ingredient name (e.g., "2 cups chopped onions")
   * @returns Normalized ingredient name (e.g., "onions")
   *
   * @example
   * normalizeIngredient("2 cups chopped onions")
   * // Returns: "onions"
   *
   * @example
   * normalizeIngredient("1/2 cup finely diced carrots")
   * // Returns: "carrots"
   */
  normalizeIngredient(ingredientName: string) {
    if (!ingredientName) return '';

    let normalized = ingredientName.toLowerCase().trim();

    normalized = normalized.replace(/^[\d\s\/]*\s*([a-z]*)\s*/, '');

    const units = ['tsp', 'tbsp', 'cup', 'cups', 'oz', 'lb', 'lbs', 'gram', 'grams', 'g', 'kg', 'ml', 'l', 'pinch', 'dash', 'clove', 'cloves'];
    units.forEach(unit => {
      const regex = new RegExp(`\\b${unit}\\b`, 'g');
      normalized = normalized.replace(regex, '');
    });

    normalized = normalized.replace(/\([^)]*\)/g, '');

    const descriptors = ['grated', 'chopped', 'diced', 'minced', 'finely', 'roughly', 'fresh', 'dried', 'ground', 'crushed', 'sliced', 'whole', 'large', 'small', 'medium', 'extra', 'virgin'];
    descriptors.forEach(descriptor => {
      const regex = new RegExp(`\\b${descriptor}\\b`, 'g');
      normalized = normalized.replace(regex, '');
    });

    normalized = normalized.replace(/\s+/g, ' ').trim();

    return normalized;
  }

  /**
   * Classify an ingredient into a grocery store category.
   *
   * Uses classification data to determine which category an ingredient belongs to.
   * Checks overrides first, then applies matching rules based on keywords.
   *
   * @param ingredientName - Raw ingredient name to classify
   * @returns Category name (e.g., "Produce", "Dairy", "Meat") or "Other"
   *
   * @example
   * classifyIngredient("tomatoes")
   * // Returns: "Produce"
   *
   * @example
   * classifyIngredient("chicken breast")
   * // Returns: "Meat"
   */
  classifyIngredient(ingredientName: string) {
    if (!this.classificationData) return 'Other';

    const normalized = this.normalizeIngredient(ingredientName);

    if (this.classificationData.overrides[normalized]) {
      return this.classificationData.overrides[normalized];
    }

    for (const rule of this.classificationData.rules) {
      for (const keyword of rule.contains) {
        if (normalized.includes(keyword)) {
          return rule.section;
        }
      }
    }

    return 'Other';
  }

  /**
   * Group array of ingredients by their grocery store categories.
   *
   * Organizes ingredients into sections (Produce, Dairy, Meat, etc.) for
   * organized display. Empty sections are removed from the result.
   *
   * @param ingredients - Array of ingredient objects with `name` property
   * @returns Object mapping category names to arrays of ingredients
   *
   * @example
   * groupIngredientsByCategory([
   *   { name: "tomatoes", quantity: "2 cups" },
   *   { name: "milk", quantity: "1 cup" }
   * ])
   * // Returns: {
   * //   "Produce": [{ name: "tomatoes", quantity: "2 cups" }],
   * //   "Dairy": [{ name: "milk", quantity: "1 cup" }]
   * // }
   */
  groupIngredientsByCategory(ingredients: any[]) {
    if (!this.classificationData) {
      return { 'Other': ingredients };
    }

    const grouped: any = {};

    this.classificationData.sections.forEach((section: string) => {
      grouped[section] = [];
    });

    ingredients.forEach((ingredient: any) => {
      const category = this.classifyIngredient(ingredient.name);
      if (grouped[category]) {
        grouped[category].push(ingredient);
      } else {
        grouped['Other'].push(ingredient);
      }
    });

    Object.keys(grouped).forEach((section: string) => {
      if (grouped[section].length === 0) {
        delete grouped[section];
      }
    });

    return grouped;
  }
}
