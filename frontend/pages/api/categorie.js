import groq from "groq";
import { client } from "../../lib/client"


// Obtener una categoría por su slug
export async function getCategoryBySlug(slug) {
    if (!slug) {
        console.log("No slug provided")
        return null;
      }
    const query = `*[_type == "category" && slug.current == "${slug}"][0]`;
    const result = await client.fetch(query);
    return result;
  }

  export async function getAllCategoriesSlugs() {
    const query = `*[_type == "category"] { "params": { "slug": slug.current } }`;
    const categories = await client.fetch(query);
    return categories;
  }
  
  // Obtener todos los posts de una categoría
  export async function getAllPostsForCategory(categoryId) {
    const query = `*[_type == "post" && category._ref == "${categoryId}" && publishedAt < now()] | order(publishedAt desc)`;
    const results = await client.fetch(query);
    return results;
    }

    
    export async function getAllCategories(categorySlug) {
        const categories = await client.fetch(
            groq`*[_type == "category"] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        description
        }`, { _id: `category-${categorySlug}` });
    return categories;
    }