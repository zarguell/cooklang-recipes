import { readdir } from "fs/promises";
import { resolve } from "path";
import { readFileSync } from "fs";
import { Recipe } from "@tmlmt/cooklang-parser";

export async function GET({ site }: { site: URL }) {
  const recipesDir = resolve("recipes");
  const files = await readdir(recipesDir);
  const cookFiles = files.filter((f) => f.endsWith(".cook"));

  const base = import.meta.env.BASE_URL; // base URL your site is served from. [web:58]
  const siteUrl = site; // Astro passes configured site as a URL. [web:56]

  const channelTitle = process.env.PUBLIC_RSS_TITLE ?? "My Recipes";
  const channelDescription =
    process.env.PUBLIC_RSS_DESCRIPTION ??
    "A collection of recipes in CookLang format";

  const items: string[] = [];

  for (const file of cookFiles) {
    const slug = file.replace(".cook", "");
    const content = readFileSync(resolve(recipesDir, file), "utf-8");

    let recipe;
    try {
      recipe = new Recipe(content);
    } catch (error: any) {
      console.error(`Error parsing ${file}:`, error?.message ?? error);
      continue;
    }

    const title = recipe.metadata.title || slug;
    const description = recipe.metadata.description || "";
    const pubDate = recipe.metadata.date
      ? new Date(recipe.metadata.date).toUTCString()
      : new Date().toUTCString();

    // Build absolute URL: <site> + <base> + recipes/<slug>/
    const recipePath = `${base}recipes/${slug}/`;
    const recipeUrl = new URL(recipePath, siteUrl).toString();

    items.push(`    <item>
      <title>${escapeXml(title)}</title>
      <description>${escapeXml(description)}</description>
      <link>${recipeUrl}</link>
      <guid isPermaLink="true">${recipeUrl}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`);
  }

  // Channel <link> should also be absolute.
  const channelLink = new URL(base, siteUrl).toString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <description>${escapeXml(channelDescription)}</description>
    <link>${channelLink}</link>
    <language>en-us</language>
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(str: any) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
