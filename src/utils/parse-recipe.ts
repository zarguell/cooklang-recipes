import { readFileSync } from "fs";
import { Recipe } from "@tmlmt/cooklang-parser";
import yaml from "js-yaml";

/**
 * Parse a Cooklang recipe file with YAML frontmatter support.
 *
 * Extracts YAML frontmatter (if present) from the file, parses the Cooklang
 * recipe content, and merges the metadata (frontmatter takes priority over
 * parsed metadata).
 *
 * Error Handling:
 * - YAML parsing errors are logged to console but don't stop execution
 * - Recipe parsing errors return a safe default object with metadata from frontmatter
 * - All errors include the file name for debugging
 *
 * @param filePath - Full path to the recipe file (e.g., "/path/to/recipes/pasta.cook")
 * @param fileName - Name of the recipe file (e.g., "pasta.cook")
 * @returns Object containing:
 *   - `slug`: Recipe identifier without .cook extension
 *   - `parsed`: Parsed Recipe object with metadata, ingredients, sections, etc.
 *
 * @example
 * const result = parseRecipeFile("/recipes/pasta.cook", "pasta.cook");
 * // Returns: { slug: "pasta", parsed: Recipe }
 *
 * @example
 * // With YAML frontmatter:
 * // ---
 * // title: Pasta Carbonara
 * // servings: 4
 * // ---
 * // Ingredients...
 * const result = parseRecipeFile("/recipes/pasta.cook", "pasta.cook");
 * // result.parsed.metadata.title === "Pasta Carbonara"
 */
export function parseRecipeFile(
  filePath: string,
  fileName: string
): { slug: string; parsed: any } {
  // Extract slug from file name (remove .cook extension)
  const slug = fileName.replace(".cook", "");

  // Read file content
  const content = readFileSync(filePath, "utf-8");

  // Extract YAML frontmatter
  let frontmatter: Record<string, any> = {};
  let recipeContent = content;

  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (frontmatterMatch) {
    try {
      frontmatter = (yaml.load(frontmatterMatch[1]) as Record<string, any>) || {};
      recipeContent = frontmatterMatch[2];
    } catch (e) {
      console.error(`Error parsing YAML in ${fileName}:`, e);
    }
  }

  // Parse Cooklang recipe
  let parsed: any;
  try {
    parsed = new Recipe(recipeContent);
    // Merge frontmatter with parsed metadata - frontmatter takes priority
    parsed.metadata = { ...parsed.metadata, ...frontmatter };
  } catch (error) {
    console.error(`Error parsing ${fileName}:`, error);
    // Return safe default if parsing fails
    parsed = { metadata: frontmatter, ingredients: [], sections: [] };
  }

  return { slug, parsed };
}
