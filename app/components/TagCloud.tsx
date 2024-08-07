"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface TagCloudProps {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagCloud: React.FC<TagCloudProps> = ({ tags = [], selectedTags, setSelectedTags }) => {
  if (!tags || tags.length === 0) {
    return <div></div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link key={tag} href={`/blog/tag/${tag}`}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${
              selectedTags.includes(tag)
                ? 'bg-white text-purple-500'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            }`}
          >
            #{tag}
          </motion.span>
        </Link>
      ))}
    </div>
  );
};

export default TagCloud;