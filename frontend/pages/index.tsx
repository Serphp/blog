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
    <div>
      <h1>Welcome to a blog! - {posts.length}</h1>
      {posts.length > 0 &&
        posts.map(({ _id, title = '', slug = { current: '' }, publishedAt = '' }) =>
          slug.current ? (
            <li key={_id}>
              <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                {title}
              </Link>{' '}
              ({new Date(publishedAt).toDateString()})
            </li>
          ) : null
        )}
    </div>
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