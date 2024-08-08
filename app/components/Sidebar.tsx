"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TagCloud from './TagCloud';

interface SidebarProps {
  categoryStructure: { [key: string]: string[] };
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    // 모든 카테고리를 초기에 펼친 상태로 설정
    const allCategories = Object.keys(categoryStructure);
    setExpandedCategories(allCategories);
  }, [categoryStructure]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderCategoryTree = (structure, prefix = '') => {
    return Object.entries(structure).map(([key, value]) => (
      <li key={key} className="mb-2">
        <div className="flex items-center">
          {typeof value === 'object' && Object.keys(value).length > 0 ? (
            <>
              <button
                onClick={() => toggleCategory(key)}
                className="mr-2 text-purple-300 focus:outline-none"
              >
                {expandedCategories.includes(key) ? '↳' : '→'}
              </button>
              <span className="text-white hover:text-purple-200 text-sm cursor-pointer" onClick={() => toggleCategory(key)}>
                {key}
              </span>
            </>
          ) : (
            <Link href={`/blog/${prefix}${key}`}>
              <span className="text-white hover:text-purple-200 text-sm ml-4">• {key}</span>
            </Link>
          )}
        </div>
        {expandedCategories.includes(key) && typeof value === 'object' && Object.keys(value).length > 0 && (
          <ul className="ml-4 mt-2">
            {Object.entries(value).map(([subKey, subValue]) => (
              <li key={subKey}>
                <Link href={`/blog/${prefix}${key}/${subKey}`}>
                  <span className="text-white hover:text-purple-200 text-sm">• {subKey}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

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
            <p>Phone: +82 010 3135 7849</p>
            <p>Email: lhe339@gmail.com</p>
          </div>
        </div>
      </div>
      <h2 className="text-lg md:text-xl font-bold text-white mb-2">List</h2>
      <div className="overflow-y-auto flex-grow mb-4">
        <ul>
          {categoryStructure && renderCategoryTree(categoryStructure)}
        </ul>
      </div>
      <h2 className="text-lg md:text-xl font-bold text-white mb-2">#Tag</h2>
      <TagCloud tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
    </div>
  );
};

export default Sidebar;