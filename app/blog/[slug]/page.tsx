import { getPostBySlug, getAdjacentPosts } from '../../lib/api';
import { notFound } from 'next/navigation';
import { Navigation } from '../../components/nav';
import Particles from '../../components/particles';
import TableOfContents from '../../components/TableOfContents';
import BlogPostContent from '../../components/BlogPostContent';
import Link from 'next/link';

export default async function BlogPost({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/');
  const decodedSlug = decodeURIComponent(slug);
  
  console.log('Fetching post for slug:', decodedSlug);
  const post = await getPostBySlug(decodedSlug);
  
  if (!post) {
    console.log('Post not found for slug:', decodedSlug);
    notFound();
  }
  
  console.log('Post fetched:', post.title);
  const adjacentPosts = await getAdjacentPosts(decodedSlug);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-tl from-purple-900 via-pink-500 to-orange-500">
      <Particles
        className="absolute inset-0 z-0"
        quantity={500}
        staticity={5}
      />
      <Navigation className="bg-transparent" />
      <div className="container relative z-10 mx-auto px-4 py-24 flex justify-center">
        <div className="w-full max-w-3xl">
          <BlogPostContent post={post} adjacentPosts={adjacentPosts} />
        </div>
        <TableOfContents content={post.body.raw} />
      </div>

      <Link href="/" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-20">
        🏠
      </Link>
    </div>
  );
}