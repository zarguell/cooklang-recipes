import { readFileSync } from "fs";
import { Recipe } from "@tmlmt/cooklang-parser";
import yaml from "js-yaml";

/**
 * Parse a Cooklang recipe file with YAML frontmatter support.
 *
 * Extracts YAML frontmatter (if present) from the file, parses the Cooklang
 * recipe content, and merges the metadata (frontmatter takes priority).
 *
 * @param filePath - Full path to the recipe file
 * @param fileName - Name of the recipe file (e.g., "pasta.cook")
 * @returns Object containing slug and parsed recipe data
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
