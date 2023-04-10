import Link from 'next/link';
const PortableText = require('@portabletext/react').PortableText;

interface PostPreviewProps {
  title: string;
  slug: string;
  excerpt: string;
  mainImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
}

const PostPreview = ({ title, slug, excerpt, mainImage }: PostPreviewProps) => (
  <div>
    <Link href={`/posts/${slug}`}>
      
        <h3>{title}</h3>
        {mainImage && (
          <img src={mainImage.asset.url} alt={mainImage.alt} />
        )}
        {excerpt && <PortableText blocks={excerpt} />}
      
    </Link>
  </div>
);

export default PostPreview;
