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

  async loadData() {
    try {
      const response = await fetch(`${window.BASE_URL}static/food-classification.json`);
      this.classificationData = await response.json();
    } catch (error) {
      console.error('Failed to load food classification data:', error);
    }
  }

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
