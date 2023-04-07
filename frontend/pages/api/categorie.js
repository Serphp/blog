import { client } from "../../lib/client"

export async function getAllCategories(categorySlug) {
    const categories = await client.fetch(
    `*[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
    }`, { _id: `category-${categorySlug}` });
return categories;
}

export const getTopicsByCategory = async (categorySlug) => {
    const topics = await client.fetch(`*[_type == "topic" && references(^._id)] {
    title,
    "slug": slug.current,
    description
}`, { _id: `category-${categorySlug}` });
return topics;
};

export async function getCategories() {
    const categories = await client.fetch(`*[_type == "category"]{slug}`);
    return categories;
}

export async function getFilteredPosts(categorySlug) {
    const posts = await client.fetch(`*[_type == "post" && references($categorySlug)]`, { categorySlug });
    return posts;
}