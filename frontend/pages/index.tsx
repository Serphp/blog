import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import groq from 'groq';
import { client } from '../lib/client';
const PortableText = require('@portabletext/react').PortableText;

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

interface EventProps {
  target: {
    value: React.SetStateAction<string>;
  };
}

const Home = ({ posts, categories }: PostsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (event: EventProps) => {
    setSearchTerm(event.target.value);
  };

  console.log(posts)
  return (
    <>
      <section className="py-l5">
        <h1 className="paragraph">Bienvenido a mis pensamientos</h1>
        <p className="paragraph2">
          Aquí encontrarás mis pensamientos, reflexiones, y experiencias.
        </p>

        <div className='contenedor'>
          <input
            type="text"
            className="imput"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="¿Que buscas hoy?"
          />
        </div>


        <div className="flex flex-column md-flex-row md-w-90pc mx-auto contenedorcard">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div className="w-100pc md-w-50pc" key={post._id}>
                <div className="card2 pointer">
                  <div className="inline-block bg-indigo-lightest-30 indigo-lightest br-3 px-4 py-1 mb-10 fs-s4 uppercase ">
                    {moment(post.publishedAt).fromNow()}
                  </div>
                  <div className="indigo-lightest fw-400 fs-m1">
                    {post.title}
                    <span className="opacity-30">
                      <div> {post.categories} </div>
                    </span>
                    <p className="opacity-50">
                      <PortableText
                        x={
                          post.body &&
                          post.body.toString().slice(0, 20)
                        }
                      />
                    </p>
                  </div>
                  <Link
                    href="/post/[slug]"
                    as={`/post/${post.slug}`}
                    className="mt-10 button bg-indigo-lightest-20 bg-white fs-s3 black no-underline"
                  >
                    Read
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className='flex justify-center items-center'>
            <p className='card3'>No hay resultados que coincidan con tu búsqueda</p>
            </div>
          )}
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
