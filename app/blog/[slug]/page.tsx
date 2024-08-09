import { getPostBySlug, getAdjacentPosts } from '../../lib/api';
import { notFound } from 'next/navigation';
import { Navigation } from '../../components/nav';
import Particles from '../../components/particles';
import { Mdx } from '../../components/mdx';
import Link from 'next/link';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  
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
      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="w-full max-w-4xl mx-auto">
          <article className="w-full bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-6">
            {post.coverImage && (
              <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{post.title}</h1>
            <div className="text-sm text-purple-200 mb-2">
              {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-purple-500/30 text-purple-200 text-xs px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {post.description && (
              <p className="text-white/80 mb-4">{post.description}</p>
            )}
          </article>
          <div className="prose prose-invert prose-lg max-w-none text-white">
            <Mdx code={post.body.code} />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-20 z-30 pointer-events-none">
        <div className="container mx-auto px-4 flex justify-between">
          {adjacentPosts.prev && (
            <Link href={`/blog/${adjacentPosts.prev.slug}`} className="pointer-events-auto">
              <button className="bg-purple-600 text-white p-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300">
                이전
              </button>
            </Link>
          )}
          {adjacentPosts.next && (
            <Link href={`/blog/${adjacentPosts.next.slug}`} className="pointer-events-auto ml-auto">
              <button className="bg-purple-600 text-white p-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300">
                다음
              </button>
            </Link>
          )}
        </div>
      </div>

      <Link href="/" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-20">
        🏠
      </Link>
    </div>
  );
}