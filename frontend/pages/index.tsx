import Link from 'next/link';
import groq from 'groq';
import { client } from '../lib/client';
import { useContext } from 'react';
import { PostContext } from './components/Context/PostContext';
import { getCategories } from './api/categorie';

interface Post {
  _id: string;
  title: string;
  categories: string;
  slug: { current: string };
  publishedAt: string;
}

interface PostsProps {
  posts: Post[];
}

const Home = ({ posts }: PostsProps) => {
  const { handleTheme } = useContext(PostContext);
  console.log(getCategories);

  return (
    <>
    <label> 
      <p>Welcome to a blog! <span className='count'>{posts.length}</span></p>
    </label>

      <div className='comcard'>
      {posts.length > 0 &&
        posts.map(({ _id, title = '',slug = { current: '' }, publishedAt = '' }) =>
          slug.current ? (
            <div key={_id}> 
              <div className='card2'>
              <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                <span className='title' >{title}</span> 
              </Link><br/>
              {publishedAt && (
                <span className='date'>{new Date(publishedAt).toDateString()}</span>
              )} 
              
              </div>
            </div>
          ) : null
        )}
        </div>
        </>
  );
};

export async function getStaticProps() {
  const postsAndCategories = await client.fetch(groq`
    {
      "posts": *[_type == "post" && publishedAt < now()] | order(publishedAt desc),
      "categories": *[_type == "category"]
    }
  `);
  const { posts, categories } = postsAndCategories;
  
  return {
    props: {
      posts,
      categories,
    },
  };
}
export default Home;