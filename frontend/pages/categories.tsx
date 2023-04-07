/* eslint-disable react/prop-types */
import Link from 'next/link';
import { getAllCategories } from './api/categorie';

interface CategoryProps {
    categories: { _id: string; title: string; slug: { current: string }; publishedAt: string; }[];
}

const Categories = ({ categories  }: CategoryProps) => {
    return (
        <>
        <label> 
        <h1>Categories</h1>
        </label>

        {
        categories.map(({ _id, title = '',slug = { current: '' }, publishedAt = '' }) => (
        <div key={_id}> 
            <div className='card2'>
            <Link href="/post/[slug]" as={`/categories/${slug?.current}`}>
            <span className='paragraph2' >{title}</span> 
            </Link><br/>
            </div>
        </div>
        )
        )}

        </>
    );
}

export async function getStaticProps() {
    const categories = await getAllCategories();
    return { props: { categories } };
}

export default Categories;
