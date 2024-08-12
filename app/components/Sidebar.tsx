"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TagCloud from './TagCloud';

interface SidebarProps {
  categoryStructure: Record<string, string[]>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  tags: string[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  categoryStructure,
  selectedCategory,
  setSelectedCategory,
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  console.log('Sidebar categoryStructure:', categoryStructure); // 디버깅용 로그

  return (
    <div className="p-4 h-full flex flex-col overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="flex flex-col items-center space-y-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 p-1 flex-shrink-0"
        >
          <img
            src="/images/profile.jpg"
            alt="정재헌"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Jeong Jae Heon</h2>
          <div className="text-xs text-purple-200">
            <p>Birth: 1999. 01. 19</p>
            <p>Email: lhe339@gmail.com</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">Category</h3>
      {categoryStructure && Object.keys(categoryStructure).length > 0 ? (
        <ul className="space-y-2">
          {Object.entries(categoryStructure).map(([category, posts]) => (
            <li key={category}>
              <details className="group">
                <summary className="flex items-center cursor-pointer">
                  <span className="transform group-open:rotate-90 transition-transform duration-200">
                    ▶
                  </span>
                  <span className="ml-2">{category}</span>
                </summary>
                <ul className="ml-4 mt-1 space-y-1">
                  {posts.map(post => (
                    <li key={post}>
                      <Link href={`/blog/${post}`} className="text-blue-500 hover:underline">
                        {post}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <p>카테고리가 없습니다.</p>
      )}
      <h3 className="text-lg font-semibold mt-4 mb-2">Tag</h3>
      <TagCloud tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
    </div>
  );
};

export default Sidebar;