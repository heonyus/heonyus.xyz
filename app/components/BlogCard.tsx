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
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-br from-purple-400/10 to-pink-400/10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg overflow-hidden mb-3 cursor-pointer border border-purple-300/20"
      >
        <div className="flex items-center p-4">
          {post.coverImage && (
            <div className="w-1/5 mr-4">
              <Image 
                src={post.coverImage} 
                alt={post.title} 
                width={80} 
                height={80} 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="mb-1 text-sm text-purple-300">
              {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h2 className="text-xl font-semibold mb-2 text-white">{post.title}</h2>
            <p className="text-base text-purple-100 mb-2 line-clamp-2">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map(tag => (
                <span key={tag} className="text-sm px-2 py-1 rounded-full bg-purple-500/30 text-purple-200">
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