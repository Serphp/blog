/* eslint-disable react/prop-types */
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import React, { useState } from 'react';
import { client } from '../../lib/client';

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
    
    const { title, name = "Missing name", categories, authorImage, body = [] } = post;
    
    const [fontSize, setFontSize] = useState('medium');
    const fontSizes = ['small', 'medium', 'large'];

    const handleZoom = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    const nextIndex = currentIndex + 1 >= fontSizes.length ? 0 : currentIndex + 1;
    setFontSize(fontSizes[nextIndex]);
    };

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
    window.print();
    };

    //console.log(post);

    return (

        
        <section className='contenedor'>
        <div className='actions_bar'> 
            <div className='ipostcontent'>
            <button className='ipost' onClick={handleZoom}>Zoom</button>
            <button className='ipost'onClick={handleShare}>Share</button>
            <button className='ipost' onClick={handlePrint}>Print</button>
            </div>
        </div>

        <div className='post'> 

        <div className='post__header'>
        <span className='titlepost'>{title}</span>
        <span className='author'>By {name}</span>
        </div>
        {categories && (
            <div>
            Posted in {categories.map(category => <span key={category}>{category}</span>)}
            </div>
        )}
        {authorImage && (
            <div className='cavatar'>
            <img className='imgavatar' src={urlFor(authorImage)} title={`${name}'s picture`} />
            </div>
        )}
        <div className='post__body'>
            <div className='content' style={{ fontSize: fontSize }}>
        <PortableText value={body} components={ptComponents}/>
            </div>
        </div>

        </div> 
        </section>
    )
    }

    const query = groq`*[_type == "post" && slug.current == $slug][0]{
        title,
        "name": author->name,
        "categories": categories[]->title,
        "authorImage": author->image.asset,
        body
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