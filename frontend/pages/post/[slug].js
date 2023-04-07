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

    const [setSelectedText] = useState(''); //selectedText, 
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [setButtonPosition] = useState({ top: 0, left: 0 }); //buttonPosition
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [fontSize, setFontSize] = useState('medium');
    const fontSizes = ['small', 'medium', 'large'];
    const handleZoom = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    const nextIndex = currentIndex + 1 >= fontSizes.length ? 0 : currentIndex + 1;
    setFontSize(fontSizes[nextIndex]);
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
    
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setButtonPosition({ top: rect.top - 30, left: rect.left + rect.width / 2 });
        document.addEventListener("mouseup", DetectText);
      };

    const HMarktext = () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const newNode = document.createElement('span');
        newNode.style.backgroundColor = 'yellow';
        range.surroundContents(newNode);
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
    
    
return (    
<section className=''>


<div className='actions_bar'> 
<div className='ipostcontent'>

<button className='button ipost' onClick={handleZoom}>Zoom</button>
<button className='ipost'onClick={handleShare}>Share</button>
<button className='ipost' onClick={handlePrint}>Print</button>
<button className="ipost button bg-pink"><span className="input-icon"><ion-icon name="heart" size="small"></ion-icon></span></button>
<button className="ipost button">SEARCH<ion-icon name="search" size="small" class="ml-3"></ion-icon></button>

</div>


        </div>
    <section className="p-10 md-p-10">
            <div className="card3 flex flex-wrap md-justify-between md-items-center">
            <div className="flex items-center">
                <img className="imgavatar w-40 h-40 br-50 mr-5" src={urlFor(authorImage).width(100).height(100).fit('max').auto('format')} alt={name} />
                <span className="opacity-50 fs-m1 fw-600">{name}</span>
            </div>
            <div className="flex items-center mt-5 md-mt-0">
                <span className="opacity-40 fs-m1 fw-600 mr-5">Categories:</span>
                <div className="flex flex-wrap">
                    {categories.map((category, index) => (
                        <span key={index} className="opacity-40 fs-m1 fw-600 mr-5">{category}</span>
                    ))}
                </div>
            </div>
        </div>

        <div className="br-8 bg-indigo-lightest-10 p-10 md-p-l0 flex flex-wrap md-justify-between md-items-center">
            <div className="w-100pc">
                <h1 className='title'> {title} </h1>
                
                <p className="fw-600 opacity-50 m-10">
                <div className='content' onMouseUp={HTextSelect} style={{ fontSize: fontSize }}>
                    <PortableText value={body} components={ptComponents}/>
                    {isButtonVisible && (
                        <button className='buttonabsolute' onClick={HMarktext}>+</button>
                        
                    )}
                </div>
                </p>
            </div>
        </div>
        <div className='card3 flex items-center mt-5 md-justify-end'> 
            <div className='fs-m1 fw-600 mr-5 fs-m1 fw-600 mr-5'>{postDate}</div> 
        </div>
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
    
    export default Post;