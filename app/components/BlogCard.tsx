"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Post } from 'contentlayer/generated'; // Post type imported

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  if (!post) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-md overflow-hidden mb-6"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="flex">
          {post.coverImage && (
            <div className="w-1/3">
              <Image src={post.coverImage} alt={post.title} width={300} height={200} objectFit="cover" />
            </div>
          )}
          <div className="p-6 w-2/3">
            <div className="mb-2 text-sm text-gray-200">
              {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">{post.title}</h2>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded bg-purple-200 text-purple-800">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}