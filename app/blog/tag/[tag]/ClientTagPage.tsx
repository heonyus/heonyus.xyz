"use client";

import React from 'react';
import BlogCard from '../../../components/BlogCard';
import Pagination from '../../../components/Pagination';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Post } from 'contentlayer/generated';
import { useRouter } from 'next/navigation';

interface ClientTagPageProps {
  posts: Post[];
  tag: string;
}

export default function ClientTagPage({ posts, tag }: ClientTagPageProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const decodedTag = decodeURIComponent(tag);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-purple-900 via-pink-500 to-orange-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">태그: #{decodedTag}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => router.push(`/blog/${post.slug}`)}
              className="cursor-pointer"
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Link href="/blog" className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 z-30">
        🏠
      </Link>
    </div>
  );
}