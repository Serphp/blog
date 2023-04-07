import { useRouter } from 'next/router';
import React from 'react';
//import { posts } from '../api/posts'
import { getCategories, getFilteredPosts } from '../api/categorie';

export default function CategoryPage({ posts }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>{slug}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories
    .filter((category) => category.slug?.current) // filtrar por slug definido
    .map((category) => ({
      params: { slug: category.slug.current },
    }));

  if (!paths.length) {
    console.warn(`No se encontraron categorías con slug definido`);
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const posts = await getFilteredPosts({ category: slug });
  return { props: { posts } };
}
