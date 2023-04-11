/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import React, { useState } from 'react';
import { client } from '../../lib/client';
import moment from 'moment';

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
    // eslint-disable-next-line react-hooks/rules-of-hooks

    //fontSize
    //const [fontSize, setFontSize] = useState(12);


    const handleButton = () => {
        setButtonis(!buttonis);
    };

    // const handleZoom = (event) => {
    //     const value = parseInt(event.target.value);
    //     setFontSize(value);
    //   };
    //console.log(fontSize);
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
    
    const handlePrint = () => {window.print();};
    //console.log(selectedText);
    
    const buttonstate = buttonis ? 'hide' : 'show';
    console.log(selectedText);

return (    
<section className='contain'>

    <section className="p-10 md-p-10 contenedor">
            <div className="card3 flex flex-wrap md-justify-between md-items-center">
            <div className="flex items-center">
                <img className="imgavatar w-40 h-40 br-50 mr-5" src={urlFor(authorImage).width(100).height(100).fit('max').auto('format')} alt={name} />
                <span className="opacity-50 fs-m1 fw-600">{name}</span>
            </div>
            <div className="flex items-center mt-5 md-mt-0">
                <span className="opacity-40 fs-m1  mr-5">Categories:</span>
                <div className="flex flex-wrap">
                    {categories.map((category, index) => (
                        <span key={index} className="opacity-40 fs-m1 mr-5">{category}</span>
                    ))}
                </div>
            </div>
        </div>
    
    <div className="card3 flex items-center justify-end">
        <div className="flex items-center ml-5">
        <button className="button ipost" onClick={handleButton}> {buttonstate} </button>
            <button className="button bg-pink"><span className="input-icon"><ion-icon name="heart" size="small"></ion-icon></span></button>
            <button className="button">SEARCH<ion-icon name="search" size="small" class="ml-3"></ion-icon></button>
        </div>
    </div>

    {
    buttonis && (
        <>
        <div className='card3'>
        {/* <button className="button bg-pink" onClick={HMarktext}><span className="input-icon"><ion-icon name="bookmark" size="small"></ion-icon></span></button>
        <button className="button bg-pink" onClick={HTextSelect}><span className="input-icon"><ion-icon name="create" size="small"></ion-icon></span></button> */}
        <button className="button bg-pink" onClick={handleFullScreen}><span className="input-icon"><ion-icon name="resize" size="small"></ion-icon></span></button>
        <button className="button bg-pink" onClick={handleShare}><span className="input-icon"><ion-icon name="share-social" size="small"></ion-icon></span></button>
        <button className="button" onClick={handlePrint}>PRINT<ion-icon name="print" size="small" class="ml-3"></ion-icon></button>
        </div>
        </>
    )
    }

      {/* <input type="range" min="12" max="22" value={fontSize} onChange={handleZoom} />
      <span>{fontSize}px</span> */}

        <div className="card3">
                <h1 className='title'> {title} </h1>
                
                <div className="fw-100 opacity-80 m-3">
                <div className='content' onMouseUp={HTextSelect} >

                    <PortableText value={body} components={ptComponents} />
 
                </div>
            </div>
        </div>
        <div className='card3 flex items-center mt-5 md-justify-end'> 
            <div className='fs-m1 fw-600 mr-5 fs-m1 fw-600 mr-5'>{postDate}</div> 
        </div>
        {isButtonVisible && (<button className='buttonabsolute' onClick={HMarktext}>+</button>)}
    </section>
    <div className='p-10'></div>
        </section>
        
    )
    }

    const query = groq`*[_type == "post" && slug.current == $slug][0]{
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