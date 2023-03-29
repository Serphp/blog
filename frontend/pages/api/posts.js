import { client } from "../../lib/client"

export default function handler(req, res) {
res.status(200).json({ name: 'Bryan Rodriguez' })
}

export const loadPosts = async (start, end) => {
// | order(publishDate desc) [${start}...${end}], 

const query = `{
    "posts": *[_type == "post"][${start}...${end}] | order(publishDate desc)  {
        _id, 
        title, 
        slug, 
        body,
        image,
        publishDate
    },
    "total": count(*[_type == "post"])
}`;

const { posts, total } = await client.fetch(query)

return { posts, total }
}


