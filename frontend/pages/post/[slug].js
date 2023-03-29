import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import React from 'react';
import { client } from '../../lib/client';

const PortableText = require('@portabletext/react').PortableText;
const toolkit = require('@portabletext/toolkit');
//const LIST_NEST_MODE_HTML = toolkit.LIST_NEST_MODE_HTML;

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

    const Post = ({post}) => {
    const {
        title = 'Missing title',
        name = 'Missing name',
        categories,
        authorImage,
        body = []
    } = post
    console.log(post);

    return (
        <section className='contenedor'>
            <div className='post'> 
        <h1 className='post__header'>{title}</h1>
        <span>By {name}</span>
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
        <PortableText
            value={body}
            components={ptComponents}
        />
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
    export default Post

 // import { useRouter } from 'next/router'
    // import React from 'react'
    // import { client, urlFor } from '../../lib/client'
    // import { groq } from 'next-sanity'

    // export default function Post({ title, body, image }) {
    // const router = useRouter()

    // if (router.isFallback) {
    //     return <div>Loading...</div>
    // }

    // return (
    //     <div>
    //     <h1>{title}</h1>
    //     {image && <img src={urlFor(image).width(600).url()} alt={title} />}
    //     {body && <div>{body}</div>}
    //     </div>
    // )
    // }

    // export async function getStaticPaths() {
    // const posts = await client.fetch(
    //     groq`*[_type == "post" && defined(slug.current)][].slug.current`
    // )

    // const paths = posts.map((slug) => ({ params: { slug } }))

    // return {
    //     paths,
    //     fallback: true
    // }
    // }

    // export async function getStaticProps({ params }) {
    // const { slug } = params

    // const post = await client.fetch(`
    //     *[_type == "post" && slug.current == $slug][0]{
    //     title,
    //     body[] {
    //         ...,
    //         _type == "image" => {
    //         "alt": alt,
    //         "caption": caption,
    //         "url": image.asset->url
    //         }
    //     },
    //     "image": mainImage.asset->url
    //     }
    // `, { slug })

    // return {
    //     props: {
    //     title: post.title,
    //     body: post.body,
    //     image: post.image
    //     },
    //     revalidate: 1
    // }
    // }

    