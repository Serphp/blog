import groq from "groq";
import { client } from "../../lib/client"

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

export async function getCategoryBySlug(slug) {
    const category = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]`,
      { slug }
    );
    return category;
  }


export async function getCategories() {
    const categories = await client.fetch(`*[_type == "category"]{slug}`);
    return categories;
}

export async function getFilteredPosts(categorySlug) {
    const posts = await client.fetch(`*[_type == "post" && references($categorySlug)]`, { categorySlug });
    return posts;
}