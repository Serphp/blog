import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import groq from 'groq';
import { client } from '../lib/client';
//import PostPreview from './components/PostPreview';
const PortableText = require('@portabletext/react').PortableText;


interface Post {
  mainImage: { asset: { url: string; }; alt: string; };
  body: string;
  _id: string;
  title: string;
  categories: string;
  slug: { current: string };
  publishedAt: string;
  _updatedAt: string;
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
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [SearchShow, setSearchShow] = useState(false);
  const [Showcode, setShowcode] = useState(false);
  const [isWide, setIsWide] = useState(false);

  const handleWide = () => {
    setIsWide(!isWide);
  };

  const handleCode = () => {
    setShowcode(!Showcode);
  };

  const handleShowSearch = () => {
    setSearchShow(!SearchShow);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);


  // const filternonefavorites = posts.filter((post) => {
  //   return favorites.some((favorite) => favorite._id === post._id);
  // });

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (event: EventProps) => {
    setSearchTerm(event.target.value);
  };

  //console.log(posts);
  //console.log(categories);
  return (
    <>
      <section className="py-l5">
        <h1 className="paragraph">Bienvenido a mi blog</h1>
        <p className="paragraph2">
          Nunca te rindas
          <button className='showfav' onClick={handleCode}>
            {Showcode ? '-' : '+'}
          </button>
          <button className='showfav' onClick={handleShowSearch}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M15.052 14.32h.813L21 19.468 19.467 21l-5.146-5.136v-.813l-.278-.288A6.66 6.66 0 0 1 9.69 16.38a6.69 6.69 0 1 1 6.69-6.69 6.66 6.66 0 0 1-1.617 4.354l.289.278ZM5.058 9.69a4.625 4.625 0 0 0 4.632 4.63 4.625 4.625 0 0 0 4.63-4.63 4.625 4.625 0 0 0-4.63-4.632A4.625 4.625 0 0 0 5.058 9.69Z" clip-rule="evenodd"></path>
              </svg>
          </button>
          
        </p>

        {/* <PostPreview 
          title={posts[0].title}
          slug={posts[0].slug.current}
          excerpt={posts[0].body}
          mainImage={posts[0].mainImage}
        /> */}

        {
          Showcode ? (
            <>
              {
                favorites.length > 0 ? (
                  <div className='flex justify-center items-center'>
                    <p className='card3'>Tienes {favorites.length} favoritos</p>
                    
                  </div>
                ) : (
                  <div className='flex justify-center items-center'>
                    <p className='card3'>No tienes favoritos</p>
                  </div>
                )
              }
            </>
          ) : (
            <></>
          )
        }

        {
          SearchShow && (
            <>
          <div className='contenedor'>
          <input
            type="text"
            className="imput"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="¿Que buscas hoy?"
          />
        </div>
            </>
          )
        }

        <button className='showide' onClick={handleWide}> 
          {isWide ? 'Normal' : 'Wide'}
        </button>
        
        <div className="flex flex-column md-flex-row md-w-90pc mx-auto contenedorcard">
          {filteredPosts.length > 0 ? ( 
            filteredPosts.map((post) => (

              <div className={isWide ? 'w-100pc md-w-50pc' : 'w-100pc md-w-30pc'} key={post._id}>

                <div className="card2" 
                      style={{
                        backgroundImage: `url(${post.mainImage})`,
                        zIndex: "-999",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        //backdropFilter: "blur(10px)",
                        opacity: "0.5",
                      }}>
                  <div className="flex justify-between">
                  <p className="date">
                      {moment(post.publishedAt).fromNow()}</p>
                  <p className="date">
                      {moment(post._updatedAt,).fromNow()}</p>
                  </div>

                  <div className="protect">
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
                    className="postbutton">
                      
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
        "mainImage": mainImage.asset->url,
        _updatedAt,
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
