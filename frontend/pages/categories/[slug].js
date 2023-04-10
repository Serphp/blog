import { useRouter } from 'next/router';
import { getFilteredPosts, getCategories, getCategoryBySlug } from '../../lib/api';
import React from 'react';

export default function CategoryPage({ posts, category }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { title } = category;

  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    params: { slug: category.slug.current },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const posts = await getFilteredPosts({ category: slug });
  const category = await getCategoryBySlug(slug);

  return { props: { posts, category }, revalidate: 1 };
}
