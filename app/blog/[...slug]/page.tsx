"use client";

import { getPostBySlug, getAdjacentPosts } from '../../lib/api';
import { Mdx } from '../../components/mdx';
import { notFound } from 'next/navigation';
import { Navigation } from '../../components/nav';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from '../../components/particles';
import TableOfContents from '../../components/TableOfContents';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function BlogPost({ params }: { params: { slug: string[] } }) {
  const [post, setPost] = useState(null);
  const [adjacentPosts, setAdjacentPosts] = useState({ prev: null, next: null });
  const slug = params.slug.join('/');
  const [showButtons, setShowButtons] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    async function fetchPost() {
      const fetchedPost = await getPostBySlug(slug);
      if (!fetchedPost) {
        notFound();
      }
      setPost(fetchedPost);
      const adjacent = await getAdjacentPosts(slug);
      setAdjacentPosts(adjacent);
    }
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      if (pageHeight - scrollPosition < 100) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-tl from-purple-900 via-pink-500 to-orange-500">
      <Particles
        className="absolute inset-0 z-0"
        quantity={500}
        staticity={5}
      />
      <Navigation className="bg-transparent" />
      <div className="container relative z-10 mx-auto px-4 py-24 flex justify-center">
        <div ref={contentRef} className="w-full max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white/20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden mb-8"
          >
            <div className="p-4 flex items-center">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={150}
                  height={150}
                  className="w-36 h-36 object-cover rounded-lg mr-4"
                />
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">{post.title}</h1>
                <div className="text-sm text-gray-300 mb-2">
                  {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <p className="text-gray-200 mb-2 line-clamp-2">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags && post.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="prose prose-invert max-w-none text-sm md:text-base">
                <Mdx code={post.body.code} />
              </div>
            </div>
          </motion.article>
        </div>
        <TableOfContents content={post.body.raw} />
      </div>

      <Link href="/" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-20">
        🏠
      </Link>
      
      {showButtons && (
        <div className="fixed inset-x-0 bottom-20 z-30 pointer-events-none">
          <div className="container mx-auto px-4 flex justify-between">
            {adjacentPosts.prev && (
              <Link href={`/blog/${adjacentPosts.prev.slug}`} className="pointer-events-auto">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-purple-600 text-white p-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Previous
                </motion.button>
              </Link>
            )}
            {adjacentPosts.next && (
              <Link href={`/blog/${adjacentPosts.next.slug}`} className="pointer-events-auto ml-auto">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-purple-600 text-white p-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Next
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}