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
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-br from-purple-400/10 to-pink-400/10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg overflow-hidden mb-6 cursor-pointer border border-purple-300/20"
      >
        <div className="flex flex-col md:flex-row">
          {post.coverImage && (
            <div className="w-full md:w-1/3">
              <Image src={post.coverImage} alt={post.title} width={300} height={200} objectFit="cover" className="w-full h-48 md:h-full object-cover" />
            </div>
          )}
          <div className="p-6 w-full md:w-2/3">
            <div className="mb-2 text-sm text-purple-300">
              {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-white">{post.title}</h2>
            <p className="text-purple-100 mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}