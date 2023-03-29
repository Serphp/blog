import Post from './components/post'

    export default function Blog({ posts }) {
    return (
    <div>
        {posts.map((post) => (
        <Post key={post._id} post={post} />
        ))}
    </div>
    )
    }

    export async function getStaticProps() {
    const posts = await getClient().fetch(
    groq`*[_type == "post"] | order(_createdAt desc)`
    )

    return {
    props: {
        posts,
    },
    revalidate: 60 * 60, // Vuelve a generar la página cada hora
    }
    }