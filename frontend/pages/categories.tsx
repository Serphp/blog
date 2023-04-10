/* eslint-disable react/prop-types */
//import Link from 'next/link';
import { getAllCategories } from '../pages/api/categorie';

interface CategoryProps {
    categories: { _id: string; title: string; description: string; slug: { current: string }; }[];
    //category: { _id: string; title: string; description: string; slug: { current: string }; }[];
}

const Categories = ({ categories  }: CategoryProps) => {
    console.log(categories);
    return (
        <>
        <label> 
        <h1>Categories</h1>
        </label>

        {
        categories.map(({ _id, title = '', description }) => (
        <div key={_id}> 
            <div className='card2'>
            
            <span className='paragraph2' >{title}</span> 
            <br/>
            <p className='white opacity-50'>{description}</p>
            </div>
        </div>
        )
        )}

        </>
    );
}

export async function getStaticProps() {
    const categories = await getAllCategories();
    //const category = await getCategoryBySlug();
    return { props: { categories } };
}

export default Categories;
