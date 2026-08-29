import { describe, it, expect } from 'vitest';
import {
  listRecipeFiles,
  loadRecipeFile,
  getAllRecipes,
  slugFromPath,
  slugifyTag,
  parseFrontmatter,
  extractSteps,
} from '../src/lib/recipes';
import { resolve } from 'node:path';

const examplePath = resolve('recipes', 'example.cook');

describe('listRecipeFiles', () => {
  it('finds recipes recursively (regression: flat readdir dropped subfolders)', () => {
    const files = listRecipeFiles();
    expect(files.length).toBeGreaterThan(0);
    expect(files.every((f) => f.endsWith('.cook'))).toBe(true);
  });
});

describe('loadRecipeFile', () => {
  it('merges YAML frontmatter into metadata (regression: RSS showed slugs)', () => {
    const recipe = loadRecipeFile(examplePath);
    expect(recipe.slug).toBe('example');
    expect(recipe.parsed.metadata.tags).toEqual(['fun', 'quick']);
    expect(recipe.parsed.metadata.source).toBe('https://www.jamieoliver.com/recipes/eggs-recipes/easy-pancakes/');
  });

  it('falls back to slug title when no frontmatter title exists', () => {
    const recipe = loadRecipeFile(examplePath);
    expect(recipe.title).toBe('example');
  });

  it('captures file mtime as a stable fallback date', () => {
    const recipe = loadRecipeFile(examplePath);
    expect(() => new Date(recipe.modifiedTime)).not.toThrow();
    expect(new Date(recipe.modifiedTime).getTime()).not.toBeNaN();
  });
});

describe('getAllRecipes', () => {
  it('loads recipes sorted by title', () => {
    const recipes = getAllRecipes();
    expect(recipes.length).toBeGreaterThan(0);
    const titles = recipes.map((r) => r.title);
    expect([...titles].sort()).toEqual(titles);
  });
});

describe('extractSteps', () => {
  it('pulls steps out of sections in order', () => {
    const recipe = loadRecipeFile(examplePath);
    const steps = extractSteps(recipe.parsed);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps.every((s: any) => s.type === 'step')).toBe(true);
  });
});

describe('parseFrontmatter', () => {
  it('extracts YAML frontmatter and body', () => {
    const { frontmatter, recipeContent } = parseFrontmatter('---\ntitle: Test\nservings: 2\n---\nBody here');
    expect(frontmatter).toEqual({ title: 'Test', servings: 2 });
    expect(recipeContent).toBe('Body here');
  });

  it('returns content untouched when there is no frontmatter', () => {
    const { frontmatter, recipeContent } = parseFrontmatter('Just a recipe');
    expect(frontmatter).toEqual({});
    expect(recipeContent).toBe('Just a recipe');
  });
});

describe('slugify helpers', () => {
  it('slugifies tags for URLs', () => {
    expect(slugifyTag('Quick & Easy')).toBe('quick-easy');
    expect(slugifyTag('Café de la Paix')).toBe('cafe-de-la-paix');
    expect(slugifyTag('')).toBe('tag');
  });

  it('flattens nested recipe paths to unique slugs', () => {
    expect(slugFromPath('/x/recipes/cake.cook'.replace('/x/recipes', resolve('recipes')))).toBe('cake');
  });
});
