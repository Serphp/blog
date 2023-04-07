import Link from 'next/link';
import groq from 'groq';
import { client } from '../lib/client';
import React from 'react';
//import { PostContext } from './components/Context/PostContext';
const PortableText = require('@portabletext/react').PortableText;
import moment from 'moment';

interface Post {
  body: string;
  _id: string;
  title: string;
  categories: string;
  slug: { current: string };
  publishedAt: string;
}

interface PostsProps {
  posts: Post[];
  categories: { title: string }[];
}

const Home = ({ posts, categories  }: PostsProps) => {
  //const { handleTheme } = useContext(PostContext);
  //console.log(postsAndCategories);
  //console.log(posts)
  
  return (
    <>

    <section className="py-l5">

      <h1 className='paragraph'> Bienvenido a mis pensamientos </h1>
      <p className='paragraph2'> Aquí encontrarás mis pensamientos, reflexiones, y experiencias. </p>

        <div className="flex flex-column md-flex-row md-w-90pc mx-auto contenedorcard">

          {posts.map((post) => (
            <div className="w-100pc md-w-50pc" key={post._id}>
                <div className="card2 pointer">
                      <div className="inline-block bg-indigo-lightest-30 indigo-lightest br-3 px-4 py-1 mb-10 fs-s4 uppercase ">
                      {moment(post.publishedAt).fromNow()}
                      </div>
                    <div className="indigo-lightest fw-400 fs-m1">{post.title} 
                      <span className="opacity-30"> 
                      <div>  {post.categories} </div>
                      </span> 
                    <p className="opacity-50"> 
                      <PortableText x={post.body && post.body.toString().slice(0, 20)}/>
                    </p>
                    </div>
                      <Link href="/post/[slug]" as={`/post/${post.slug}`} className="mt-10 button bg-indigo-lightest-20 bg-white fs-s3 black no-underline">
                      Read
                      </Link>
                </div>
            </div>
          ))}
        </div>
    </section>
        </>
  );
};


export async function getStaticProps() {
  const postsAndCategories = await client.fetch(groq`
    {
      "posts": *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
        title,
        body,
        "categories": categories[]->title,
        publishedAt,
        "slug": slug.current
      },
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