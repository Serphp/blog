import Link from 'next/link';
import groq from 'groq';
import { client } from '../lib/client';
//import { ReactNode } from 'react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

interface PostsProps {
  posts: Post[];
}

const Home = ({ posts }: PostsProps) => {
  //console.log(posts);

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
  const posts: Post[] = await client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
  `);
  return {
    props: {
      posts,
    },
  };
}

export default Home;