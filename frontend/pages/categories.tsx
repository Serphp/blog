/* eslint-disable react/prop-types */
import Link from 'next/link';
import { getAllCategories } from './api/categorie';


function Categories({ categories }) {
    console.log(getAllCategories);
    return (
        <div>
        <h1>Categories</h1>
        <ul>
            {categories.map((category) => (
            <li key={category.slug?.current}>
            <Link href={`/categories/${category.slug?.current}`}>
                {category.title}
            </Link>
            </li>
            ))}

        </ul>

        {
        categories.map(({ _id, title = '',slug = { current: '' }, publishedAt = '' }) => (
        <div key={_id}> 
            <div className='card2'>
            <Link href="/post/[slug]" as={`/categories/${slug?.current}`}>
            <span className='title' >{title}</span> 
            </Link><br/>
            </div>
        </div>
        )
        )}

        </div>
    );
}

export async function getStaticProps() {
    const categories = await getAllCategories();
    return { props: { categories } };
}

export default Categories;
