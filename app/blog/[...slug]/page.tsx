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
  const contentRef = useRef(null);
  const tocRef = useRef(null);

  const { scrollY } = useScroll();
  const [contentHeight, setContentHeight] = useState(0);
  const [tocHeight, setTocHeight] = useState(0);

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
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
    if (tocRef.current) {
      setTocHeight(tocRef.current.offsetHeight);
    }
  }, [post]);

  const maxTocY = contentHeight - tocHeight - 100; // 100px is a buffer

  const tocY = useTransform(
    scrollY,
    [0, maxTocY],
    [0, maxTocY],
    { clamp: true }
  );

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
      <Navigation className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg" />
      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div ref={contentRef} className="lg:col-span-3">
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
                <div className="prose prose-invert max-w-none text-sm md:text-base lg:text-lg">
                  <Mdx code={post.body.code} />
                </div>
              </div>
            </motion.article>
          </div>
          <div className="hidden lg:block">
            <motion.div 
              ref={tocRef}
              style={{ y: tocY }}
              className="sticky top-24 transition-all duration-300 ease-in-out"
            >
              <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4 border border-white/20">
                <h2 className="text-lg font-semibold text-white mb-3">목차</h2>
                <div className="toc-container max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <TableOfContents content={post.body.raw} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Link href="/" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-20">
        🏠
      </Link>
      
      {/* 이전/다음 포스트 버튼 */}
      <div className="fixed bottom-8 left-8 right-8 flex justify-between z-20">
        {adjacentPosts.prev && (
          <Link href={`/blog/${adjacentPosts.prev.slug}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
            >
              ← {adjacentPosts.prev.title}
            </motion.div>
          </Link>
        )}
        {adjacentPosts.next && (
          <Link href={`/blog/${adjacentPosts.next.slug}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
            >
              {adjacentPosts.next.title} →
            </motion.div>
          </Link>
        )}
      </div>
    </div>
  );
}