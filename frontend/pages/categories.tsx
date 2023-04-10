/* eslint-disable react/prop-types */
//import Link from 'next/link';
import { getAllCategories, getAllCategoriesSlugs, getAllPostsForCategory, getCategoryBySlug } from '../pages/api/categorie';

import Link from "next/link";
import { useRouter } from "next/router";

interface CategoriesProps {
  categories: {
    title: string;
    slug: string;
  }[];
}

export default function Categorias({ categories }: CategoriesProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/categorias/${category.slug}`}>
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
}
