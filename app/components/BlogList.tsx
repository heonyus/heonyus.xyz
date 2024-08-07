"use client";

import React from 'react';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import { Post } from 'contentlayer/generated'; // Post type imported
import Link from 'next/link';

interface BlogListProps {
  posts: Post[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/blog/${post.slug}`}>
            <BlogCard post={post} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogList;