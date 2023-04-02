/* eslint-disable react/prop-types */
import Link from 'next/link';
import { getAllCategories } from './api/categorie';
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';


function Categories({ categories }) {
    console.log(getAllCategories);
    return (
        <div>
        <label> 
        <h1>Categories</h1>
        </label>

        {/* <ul>
            {categories.map((category: { slug: { current: Key | null | undefined; }; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
            <li key={category.slug?.current}>
            <Link href={`/categories/${category.slug?.current}`}>
                {category.title}
            </Link>
            </li>
            ))}

        </ul> */}

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
