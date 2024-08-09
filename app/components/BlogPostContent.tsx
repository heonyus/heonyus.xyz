'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mdx } from './mdx';
import Link from 'next/link';

export default function BlogPostContent({ post, adjacentPosts }) {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white/20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden mb-8"
      >
        {/* 포스트 헤더 내용 */}
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
    </>
  );
}