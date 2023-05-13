/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import React, { useEffect, useState } from 'react';
import { client } from '../../lib/client';
import moment from 'moment';
//import { getfavorites } from '../components/Context/PostContext';

const PortableText = require('@portabletext/react').PortableText;
//const toolkit = require('@portabletext/toolkit');

    function urlFor (source) {
        return imageUrlBuilder(client).image(source)
        }

    const ptComponents = {
    types: {
        object: ({ children }) => children.map(child => <React.Fragment key={child._key}>{child}</React.Fragment>),
        image: ({ value }) => {
        if (!value?.asset?._ref) {
            return null
        }
        
        return (
            <img
            alt={value.alt || ' '}
            loading="lazy"
            src={urlFor(value).width(320).height(240).fit('max').auto('format')}
            />
        )
        }
    }
    }

    const Post = ({ post }) => {
    if (!post || !post.title) {
        return <div>Loading...</div>;
    }
    //constantes
    const { title, name = "Missing name", categories, authorImage, publishedAt, body = [] } = post;
    const postDate = moment(publishedAt).fromNow();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [buttonis, setButtonis] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [buttonfav, setButtonfav] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const handleButton = () => {
        setButtonis(!buttonis);
    };

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(favorites);
        if (favorites.some((favorite) => favorite._id === post._id)) {
            setButtonfav(true);
        } else {
            setButtonfav(false);
        }
    }, [post._id]);

    const handleFullScreen = () => {
        if (!isFullScreen) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
        setIsFullScreen(!isFullScreen);
      };

    //Logica de remarcado de texto
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const DetectText = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString();
      
        // Ocultar el botón si no hay texto seleccionado
        if (selectedText.length === 0) {
          setIsButtonVisible(false);
        }
      
        // Remover el event listener para evitar que se siga ejecutando innecesariamente
        document.removeEventListener("mouseup", DetectText);
      };

      const HTextSelect = () => {
        const selection = window.getSelection();
        const text = selection.toString();
        setSelectedText(text);
        
        setIsButtonVisible(true);
    
        document.addEventListener("mouseup", DetectText);
      };

      console.log(favorites)

    const HMarktext = () => {
        const selection = window.getSelection();
        if (!selection?.toString()) return; // No se ha seleccionado nada
        const ranges = [];
        for (let i = 0; i < selection.rangeCount; i++) {
          const range = selection.getRangeAt(i);
          if (range.toString().length < 5) continue; // Selección demasiado corta
          ranges.push(range);
        }
        if (!ranges.length) return; // No se encontró ninguna selección válida
        ranges.forEach(range => {
          const newNode = document.createElement('span');
          newNode.style.backgroundColor = 'yellow';
          range.surroundContents(newNode);
        });
        setIsButtonVisible(false);
      };
      //End Logica de remarcado de texto

    const handleShare = () => {
    if (navigator.share) {
            navigator.share({
            title: document.title,
            url: window.location.href,
        })
            .then(() => console.log('Se compartió con éxito'))
            .catch((error) => alert(`Error al compartir: ${error}`));
        }
    };
    
    const handlePrint = () => {
        const content = document.querySelector('.print-content');
        window.print(content);
      };

    const handleFavorite = () => {
        setButtonfav(!buttonfav);
        const newFavorites = [...favorites];
    
        if (!favorites.some((favorite) => favorite._id === post._id)) {
            newFavorites.push(post);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } else {
            const index = newFavorites.findIndex((favorite) => favorite._id === post._id);
            newFavorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            console.log(post._id)
        }
        
        setFavorites(newFavorites);
    };
    
    console.log(selectedText)

return (    
<section className=''>

    <section className="p-10 md-p-10 contenedor">
            <div className="card3">
            <div className="flex items-center">
                <img className="imgavatar w-40 h-40 br-50 mr-5" src={urlFor(authorImage).width(100).height(100).fit('max').auto('format')} alt={name} />
                <span className="titlepost">{name}</span>
            </div>
            <div className="ccategory">
                <span className="icon">
                <ion-icon name="caret-forward-outline"></ion-icon>
                    </span>
                <div className="">
                    {categories.map((category, index) => (
                        <span key={index} className="titlepost">{category}</span>
                    ))}
                </div>
            </div>
        </div>
    
    <div className="card3 flex items-center justify-end">
        <div className="flex items-center ml-5">
            
        <button className={`buttonpost ${buttonis ? '' : 'active'}`} onClick={handleButton}>
            {
                buttonis ? (
                <ion-icon name="caret-back-outline"></ion-icon>
                ) : (
                <ion-icon name="caret-back-outline"></ion-icon>
                )
            }
            </button>
            <button className="button bg-pink" onClick={handleFavorite}>
                    {
                        buttonfav ? (
                            <span className="input-icon"><ion-icon name="heart" size="small"></ion-icon></span>
                        ) : (
                            <span className="input-icon"><ion-icon name="heart-outline" size="small"></ion-icon></span>
                        )
                    }
                </button>
        </div>
    </div>

    <div className={`card4 ${buttonis ? 'active' : ''}`}>
        {/* <button className="button bg-pink" onClick={HMarktext}><span className="input-icon"><ion-icon name="bookmark" size="small"></ion-icon></span></button>
        <button className="button bg-pink" onClick={HTextSelect}><span className="input-icon"><ion-icon name="create" size="small"></ion-icon></span></button> */}
        <button className="button bg-pink" onClick={handleFullScreen}><span className="input-icon"><ion-icon name="resize" size="small"></ion-icon></span></button>
        <button className="button bg-pink" onClick={handleShare}><span className="input-icon"><ion-icon name="share-social" size="small"></ion-icon></span></button>
        <button className="button" onClick={handlePrint}>PRINT<ion-icon name="print" size="small" class="ml-3"></ion-icon></button>
        </div>
    {
    buttonis && (
        <>
        

        </>
    )
    }

      {/* <input type="range" min="12" max="22" value={fontSize} onChange={handleZoom} />
      <span>{fontSize}px</span> */}

        <div className="card3">
                <h1 className='title'> {title} </h1>
                
                <div className="fw-100 opacity-80 m-3">
                <div className='content print-content' onMouseUp={HTextSelect} >

                    <PortableText value={body} components={ptComponents} />
 
                </div>
            </div>
        </div>
        <div className='card3 flex items-center mt-4 md-justify-end'> 
        <span className='icon'> 
        <ion-icon name="calendar-outline" title="Fecha" size="small"></ion-icon>
        </span>

            <div className='postdate'>
                {postDate}
                </div> 
        </div>
        {isButtonVisible && (<button className='buttonabsolute' onClick={HMarktext}>+</button>)}
    </section>
    <div className='p-10'></div>
        </section>
        
    )
    }

    const query = groq`*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        "name": author->name,
        "categories": categories[]->title,
        "authorImage": author->image.asset,
        body,
        publishedAt
    }`
    export async function getStaticPaths() {
    const paths = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: true,
    }
    }

    export async function getStaticProps(context) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = "" } = context.params
    const post = await client.fetch(query, { slug })
    return {
        props: {
        post
        }
    }
    }
    
    export async function getAllPostsForCategory(categoryId) {
        const query = `
          *[_type == "post" && references($categoryId) && publishedAt < now()] | order(publishedAt desc)
        `;
        const params = { categoryId };
        const posts = await client().fetch(query, params);
        return posts;
      }

    export default Post;