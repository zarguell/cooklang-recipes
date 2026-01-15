/**
 * Recipe metadata utilities for parsing and schema generation.
 * Handles YAML frontmatter extraction and JSON-LD schema generation.
 */

import yaml from 'js-yaml';

/**
 * Step item types in Cooklang format.
 */
export interface StepItem {
  type: string;
  value?: any;
  displayName?: string;
  name?: string;
}

/**
 * Recipe metadata structure.
 */
export interface RecipeMetadata {
  title?: string;
  description?: string;
  image?: string;
  source?: string;
  "prep-time"?: string;
  "cook-time"?: string;
  "total-time"?: string;
  servings?: number;
  category?: string;
  cuisine?: string;
  tags?: string[];
  author?: string;
}

/**
 * Frontmatter extraction result.
 */
export interface FrontmatterResult {
  frontmatter: RecipeMetadata;
  recipeContent: string;
}

/**
 * Extract text from step items for JSON-LD representation.
 *
 * Handles various step item types: text, ingredient, cookware, timer.
 * Converts each item type to its human-readable text representation.
 *
 * @param items - Array of step items from Cooklang parser
 * @param cookwareList - Map of cookware items
 * @param timersList - Map of timer items
 * @returns Text representation of the step
 *
 * @example
 * getStepText(
 *   [{ type: 'text', value: 'Heat oil' }],
 *   { 'pan': { name: 'Frying pan' } },
 *   { 'timer1': { duration: { value: { value: 5 } }, unit: 'minutes' } }
 * )
 * // Returns: "Heat oil 5 minutes"
 */
export function getStepText(
  items: StepItem[],
  cookwareList: Record<string, any>,
  timersList: Record<string, any>
): string {
  if (!items || items.length === 0) return "";

  return items
    .map((item) => {
      if (item.type === "text") return item.value;
      if (item.type === "ingredient") return item.displayName || item.name || "";

      if (item.type === "cookware") {
        const cookwareItem = cookwareList[item.value];
        return cookwareItem?.name || "cookware";
      }

      if (item.type === "timer") {
        const timerItem = timersList[item.value];
        if (!timerItem) return "timer";
        const quantity = timerItem.duration?.value?.value || "";
        const unit = timerItem.unit || "minutes";
        return `${quantity} ${unit}`;
      }

      return "";
    })
    .join("");
}

/**
 * Parse YAML frontmatter from recipe content.
 *
 * Extracts YAML metadata from the beginning of a .cook file and
 * returns both the parsed frontmatter and the remaining recipe content.
 *
 * @param content - Full recipe file content including YAML frontmatter
 * @returns Parsed frontmatter and remaining recipe content
 *
 * @example
 * const result = parseFrontmatter('---
 * title: Pasta
 * ---
 * Instructions...')
 * // Returns: {
 * //   frontmatter: { title: 'Pasta' },
 * //   recipeContent: 'Instructions...'
 * // }
 */
export function parseFrontmatter(content: string): FrontmatterResult {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    return { frontmatter: {}, recipeContent: content };
  }

  try {
    const frontmatter = yaml.load(frontmatterMatch[1]) || {};
    const recipeContent = frontmatterMatch[2];
    return { frontmatter, recipeContent };
  } catch (e) {
    console.error(`Error parsing YAML frontmatter:`, e);
    return { frontmatter: {}, recipeContent: frontmatterMatch[2] };
  }
}

/**
 * Generate JSON-LD schema for search engine optimization.
 *
 * Creates a Recipe schema.org structure with all relevant metadata,
 * ingredients, and instructions for structured data.
 *
 * @param metadata - Recipe metadata object
 * @param imageUrl - Recipe image URL
 * @param tags - Array of tags
 * @param source - Source URL
 * @param ingredients - Array of ingredients
 * @param steps - Array of step items
 * @param cookwareList - Map of cookware items
 * @param timersList - Map of timer items
 * @returns JSON-LD schema object
 *
 * @example
 * const schema = generateJsonLdSchema(
 *   { title: 'Pasta', servings: 4 },
 *   '/images/pasta.jpg',
 *   ['dinner', 'quick'],
 *   'https://example.com/recipe',
 *   [{ name: 'flour', quantity: { value: { value: 2 } } }],
 *   stepItems,
 *   cookwareMap,
 *   timerMap
 * )
 */
export function generateJsonLdSchema(
  metadata: RecipeMetadata,
  imageUrl: string | null,
  tags: string[],
  source: string | undefined,
  ingredients: any[],
  steps: any[],
  cookwareList: Record<string, any>,
  timersList: Record<string, any>
): Record<string, any> {
  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: metadata.title || "",
    description: metadata.description || "",
    image: imageUrl,
    prepTime: metadata["prep-time"] ? `PT${metadata["prep-time"]}` : null,
    cookTime: metadata["cook-time"] ? `PT${metadata["cook-time"]}` : null,
    totalTime: metadata["total-time"] ? `PT${metadata["total-time"]}` : null,
    recipeYield: metadata.servings || null,
    recipeCategory: metadata.category || null,
    recipeCuisine: metadata.cuisine || null,
    keywords: tags.join(", "),
    author: { "@type": "Person", name: metadata.author || "Unknown" },
    recipeIngredient: ingredients.map((ing) => {
      let str = ing.name || "";
      if (ing.quantity?.value?.value !== undefined) {
        const qty = ing.quantity.value.value;
        str = `${qty}${ing.unit ? ` ${ing.unit}` : ""} ${str}`;
      }
      return str;
    }),
    recipeInstructions: steps
      .filter((step) => step && step.items)
      .map((step: any, idx: number) => ({
        "@type": "HowToStep",
        position: idx + 1,
        text: getStepText(step.items || []),
      })),
  };
}
